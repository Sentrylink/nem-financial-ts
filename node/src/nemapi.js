const {Address} = require('nem2-sdk');
const {RepositoryFactoryHttp} = require('nem2-sdk/dist/src/infrastructure/RepositoryFactoryHttp');


class NemAPI {

  constructor(nodeUrl) {
    this.nodeUrl = nodeUrl;
    this.repositoryFactory = new RepositoryFactoryHttp(this.nodeUrl);
  }

  async getBalance(addressStr) {
    const address = Address.createFromRawAddress(addressStr);
    const accountHttp = this.repositoryFactory.createAccountRepository();

    return new Promise(function(resolve, reject) {
      accountHttp
      .getAccountInfo(address)
      .subscribe((accountInfo) => 
        {
          resolve(accountInfo.mosaics[0].amount);
        },
        (err) => {
          console.error(err);
          reject(err);
        });
    });
  }

  async _getNetworkGenerationHash() {
    // Get from ${nodeUrl}/block/1
  }

  async _defineTransferTransaction(recipientAccount) {

  }

  _wrapInAggregateAndSign(transferTransaction, senderAccount) {

  }

  async _antiSpamLock() {

  }

  /**
   * Initiates aggregate transaction that sends amount to recipient address and 
   * needs to be signed by both sender and recipient 
   * 
   * @param {*} senderPrivateKey - Private key of the sender who will send amount to recipient
   * @param {*} recipientAddress - Plain string address of recipient
   * @param {*} amount - amount to be sent
   * @returns transaction hash
   */
  async initiateAggregateTransaction(senderPrivateKey, recipientAddress, amount) {

  }

  /**
   * Cosign aggregate transaction with recipient private key
   * 
   * @param {*} txHash - transaction hash returned by initiateAggregateTransaction
   * @param {*} cosinerPrivateKey - private key of funds recipient (and also cosigner)
   */
  async cosignAggregateTransaction(txHash, cosinerPrivateKey) {

  }


};
  
module.exports = NemAPI;
