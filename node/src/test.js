const {
    Account,
    Address,
    AggregateTransaction,
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
  

const networkType = NetworkType.TEST_NET;
// replace with alice private key
const alicePrivateKey = '44CB1C8A898A289DA6DE0008BA4AC0D06F21416515C3CCE5E48FC64322956A80';
const aliceAccount = Account.createFromPrivateKey(alicePrivateKey, networkType);
// replace with ticket distributor public key
const ticketDistributorPublicKey = '7654205C311D5B89255BE8FB3229C321F3666ECFFBD433F2E953C6DDF8E55FA4';
const ticketDistributorPublicAccount = PublicAccount.createFromPublicKey(ticketDistributorPublicKey, networkType);

// replace with ticket mosaic id
const ticketMosaicId = new MosaicId('7cdf3b117a3c40cc');
// replace with ticket mosaic id divisibility
const ticketDivisibility = 0;
// replace with nem.xem id
const networkCurrencyMosaicId = new MosaicId('75AF035421401EF0');
// replace with network currency divisibility
const networkCurrencyDivisibility = 6;

const aliceToTicketDistributorTx = TransferTransaction.create(
    Deadline.create(),
    ticketDistributorPublicAccount.address,
    [new Mosaic (networkCurrencyMosaicId,
        UInt64.fromUint(100 * Math.pow(10, networkCurrencyDivisibility)))],
    PlainMessage.create('send 100 nem.xem to distributor'),
    networkType);

const ticketDistributorToAliceTx = TransferTransaction.create(
    Deadline.create(),
    aliceAccount.address,
    [new Mosaic(ticketMosaicId,
        UInt64.fromUint(1 * Math.pow(10, ticketDivisibility)))],
    PlainMessage.create('send 1 museum ticket to customer'),
    networkType);

console.log(aliceToTicketDistributorTx);


const aggregateTransaction = AggregateTransaction.createBonded(Deadline.create(),
    [aliceToTicketDistributorTx.toAggregate(aliceAccount.publicAccount),
        ticketDistributorToAliceTx.toAggregate(ticketDistributorPublicAccount)],
    networkType,
    [],
    UInt64.fromUint(2000000));

// replace with meta.generationHash (nodeUrl + '/block/1')
const networkGenerationHash = 'CC42AAD7BD45E8C276741AB2524BC30F5529AF162AD12247EF9A98D6B54A385B';
const signedTransaction = aliceAccount.sign(aggregateTransaction, networkGenerationHash);
console.log('Aggregate Transaction:', signedTransaction);

// const hashLockTransaction = HashLockTransaction.create(
//     Deadline.create(),
//     new Mosaic (networkCurrencyMosaicId,
//         UInt64.fromUint(10 * Math.pow(10, networkCurrencyDivisibility))),
//     UInt64.fromUint(480),
//     signedTransaction,
//     networkType,
//     UInt64.fromUint(2000000));
// console.log('hashLockTransaction:', hashLockTransaction);


// const signedHashLockTransaction = aliceAccount.sign(hashLockTransaction, networkGenerationHash);
// console.log('signedHashLockTransaction:', signedHashLockTransaction);

const cosignatureTransaction = CosignatureTransaction.create(signedTransaction);
console.log("cosignatureTransaction = ", cosignatureTransaction);


const ticketDistributorPrivateKey = 'D730CD27340305A64597AC786374DEF9E57302D1BFDFF21A5CB6CF3AF376982B';
const ticketDistributorPrivateAccount = Account.createFromPrivateKey(ticketDistributorPrivateKey, networkType);

const cosignedTx = ticketDistributorPrivateAccount.signCosignatureTransaction(cosignatureTransaction);
console.log("cosignedTx = ", cosignedTx);
