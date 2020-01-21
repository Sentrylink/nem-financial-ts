const {
  Account,
  Address,
  AggregateTransaction,
  CosignatureSignedTransaction,
  CosignatureTransaction,
  Deadline,
  HashLockTransaction,
  Listener,
  Mosaic,
  MosaicId,
  NetworkType,
  PlainMessage,
  PublicAccount,
  TransactionService,
  TransferTransaction,
  UInt64,
} = require('nem2-sdk');

const {RepositoryFactoryHttp} = require('nem2-sdk/dist/src/infrastructure/RepositoryFactoryHttp');
const request = require("request");
const {filter, map, mergeMap} = require('rxjs/operators');

const config = require("./config");

class NemAPI {

  constructor(nodeUrl) {
    this.nodeUrl = nodeUrl;
    this.repositoryFactory = new RepositoryFactoryHttp(this.nodeUrl);
    this.networkType = NetworkType.TEST_NET;
    this.networkCurrencyDivisibility = 6;
  }

  async _getNetworkMosaicId(account) {
    const accountHttp = this.repositoryFactory.createAccountRepository();

    return new Promise(function(resolve, reject) {
      accountHttp
      .getAccountInfo(account)
      .subscribe((accountInfo) => 
        {
          resolve(accountInfo.mosaics[0].id);
        },
        (err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  async getBalance(addressStr) {
    const address = Address.createFromRawAddress(addressStr);
    const accountHttp = this.repositoryFactory.createAccountRepository();

    return new Promise(function(resolve, reject) {
      accountHttp
      .getAccountInfo(address)
      .subscribe((accountInfo) => 
        {
          resolve(accountInfo.mosaics[0].amount/1000000);
        },
        (err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  /**
   * Get Network Generation Hash from ${nodeUrl}/block/1
   */
  async _getNetworkGenerationHash() {
    const requestPath = '/block/1';

    var options = { method: 'GET', url: `${this.nodeUrl}${requestPath}` };

    return new Promise(function(resolve, reject) {
        request(options, function (error, response, body) {
          const responseObj = JSON.parse(body);
          if (error) reject(error);
            else {
              resolve(responseObj.meta.generationHash);
            }
        });
    });

  }

  async _defineTransferTransaction(recipientAccount, amount) {
    // Find Network Mosaic ID
    if (this.networkMosaicId == undefined) {
      const recipientAddress = Address.createFromRawAddress(recipientAccount.address.address);
      this.networkMosaicId = await this._getNetworkMosaicId(recipientAddress);
    }

    return TransferTransaction.create(
      Deadline.create(),
      recipientAccount.address,
      [new Mosaic (this.networkMosaicId,
        UInt64.fromUint(amount * Math.pow(10, this.networkCurrencyDivisibility)))],
      PlainMessage.create(`send ${amount} nem.xem to client`),
      this.networkType);
  }

  // This transaction will send minimal amount from debtor to lender to include debtor in aggregate transaction
  // In production, "debtor token" should be used instead of network mosaic
  async _defineAcknoledgeTokenTransaction(lenderAccount) {
    // Find Network Mosaic ID
    if (this.networkMosaicId == undefined) {
      const recipientAddress = Address.createFromRawAddress(lenderAccount.address.address);
      this.networkMosaicId = await this._getNetworkMosaicId(recipientAddress);
    }

    return TransferTransaction.create(
      Deadline.create(),
      lenderAccount.address,
      [new Mosaic (this.networkMosaicId,
        UInt64.fromUint(1))],
      PlainMessage.create(`send acknoledge token to lender`),
      this.networkType);
  }

  async _wrapInAggregate(transferTransaction, ackTransaction, senderAccount, recipientAccount) {
    const aggregateTransaction = AggregateTransaction.createComplete(Deadline.create(),
      [transferTransaction.toAggregate(senderAccount), ackTransaction.toAggregate(recipientAccount)],
      this.networkType,
      [],
      UInt64.fromUint(2000000));

    return aggregateTransaction;
  }

  /**
   * Initiates aggregate transaction that sends amount to recipient address and 
   * needs to be signed by both sender and recipient 
   * 
   * @param {*} senderPrivateKey - Private key of the sender who will send amount to recipient
   * @param {*} recipientPublicKey - Public key of recipient
   * @param {*} amount - amount to be sent
   * @returns serialized pre - aggregate transaction object for constructing aggregate complete transaction
   */
  async initiateAggregateTransaction(senderPublicKey, recipientPublicKey, amount) {
    const preAggregateTxObj = {
      lenderPubKey: senderPublicKey, 
      debtorPubKey: recipientPublicKey, 
      amount: amount,
    }

    return JSON.stringify(preAggregateTxObj);
  }

  /**
   * Cosign aggregate transaction with recipient private key
   * 
   * @param {*} aggregateTx - Aggregate transaction returned by initiateAggregateTransaction
   * @param {*} signerPrivateKey - private key of funds sender (and also cosigner)
   * @param {*} cosinerPrivateKey - private key of funds recipient (and also cosigner)
   */
  async cosignAggregateTransaction(aggregateTxStr, signerPrivateKey, cosinerPrivateKey) {

    const preAggregateTxObj = JSON.parse(aggregateTxStr);

    const recipientAccPub = PublicAccount.createFromPublicKey(preAggregateTxObj.debtorPubKey, this.networkType);
    const lenderAccPub = PublicAccount.createFromPublicKey(preAggregateTxObj.lenderPubKey, this.networkType);

    // 1. Create two simple transactions
    const xferTx = await this._defineTransferTransaction(recipientAccPub, preAggregateTxObj.amount);
    const ackTx = await this._defineAcknoledgeTokenTransaction(lenderAccPub);
    console.log("xferTx = ", xferTx);
    console.log("ackTx = ", ackTx);

    // 2. Wrap simple transactions in aggregate transaction
    const aggregateTransaction = await this._wrapInAggregate(xferTx, ackTx, lenderAccPub, recipientAccPub);
    console.log("aggTransaction = ", aggregateTransaction);

    // 4. Co-sign
    const networkGenerationHash = await this._getNetworkGenerationHash();
    const senderAcc = Account.createFromPrivateKey(signerPrivateKey, this.networkType);
    const recipientAcc = Account.createFromPrivateKey(cosinerPrivateKey, this.networkType);
    const signedTransaction = senderAcc.signTransactionWithCosignatories(aggregateTransaction, [recipientAcc], networkGenerationHash);

    // 5. Announce
    const repositoryFactory = new RepositoryFactoryHttp(this.nodeUrl, this.networkType, networkGenerationHash);
    const listener = repositoryFactory.createListener();
    const receiptHttp = repositoryFactory.createReceiptRepository();
    const transactionHttp = repositoryFactory.createTransactionRepository();
    const transactionService = new TransactionService(transactionHttp, receiptHttp);
    
    listener.open().then(() => {
        transactionService.announce(signedTransaction, listener);
        listener.close();
    });
  }

  async simpleTransaction(senderPrivateKey, rawAddress, amount) {

    console.log("amount =", amount);

    const recipientAddress = Address.createFromRawAddress(rawAddress);
    const senderAccount = Account.createFromPrivateKey(senderPrivateKey, this.networkType);
    console.log("account =", senderAccount);
    const networkCurrencyMosaicId = await this._getNetworkMosaicId(recipientAddress);
    console.log("networkCurrencyMosaicId =", networkCurrencyMosaicId);

    const transferTransaction = TransferTransaction.create(
        Deadline.create(),
        recipientAddress,
        [new Mosaic (networkCurrencyMosaicId,
            UInt64.fromUint(amount * Math.pow(10, this.networkCurrencyDivisibility)))],
        PlainMessage.create('Simple transaction'),
        this.networkType,
        UInt64.fromUint(2000000));
    console.log("transferTransaction =", transferTransaction);
    
    const networkGenerationHash = await this._getNetworkGenerationHash();
    console.log("networkGenerationHash =", networkGenerationHash);


    const signedTransaction = senderAccount.sign(transferTransaction, networkGenerationHash);

    const repositoryFactory = new RepositoryFactoryHttp(this.nodeUrl, this.networkType, networkGenerationHash);
    const transactionHttp = repositoryFactory.createTransactionRepository();

    return new Promise(function(resolve, reject) {
      transactionHttp
        .announce(signedTransaction)
        .subscribe((x) => resolve(x), (err) => reject(err));
    });
  }

};
  
module.exports = NemAPI;
