const BigNumber = require('bignumber.js');
const bodyParser = require('body-parser');
const config = require('./config');
const express = require('express');
const Model = require('./model');
const moment = require('moment');
const NemAPI = require('./nemapi');
const pug = require('pug');
const session = require('express-session');


////////////////////////////////////////////////////////////
// Initialize Express

const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(session({
    secret: '34SDgsdgspxxxxxxxdfsG', // just a long random string
    resave: false,
    saveUninitialized: true
}));
app.use('/images', express.static('src/templates/images'))
app.use('/css', express.static('src/templates/css'))
app.use('/fonts', express.static('src/templates/fonts'))

const port = 8080;

////////////////////////////////////////////////////////////
// Initialize NEM SDK and DB

const nemApi = new NemAPI(config.apiUrl);
const model = new Model();

////////////////////////////////////////////////////////////
// Initialize routes
app.get('/', function (req, res) {
	//console.log(req.session.id)
  const compiledFunction = pug.compileFile('src/templates/index.pug');
	res.send(compiledFunction({
    name: 'Timothy'
  }));
});

app.get('/lenderlogin', function (req, res) {
  const compiledFunction = pug.compileFile('src/templates/lenderlogin.pug');
	res.send(compiledFunction({}));
});

app.get('/lender', function (req, res) {
  const compiledFunction = pug.compileFile('src/templates/lender.pug');
	res.send(compiledFunction({}));
});

app.get('/classes', function (req, res) {
  const compiledFunction = pug.compileFile('src/templates/classes.pug');

  const classes = [
    {
      id: 1,
      name: 'sPAM',
      description: 'Simplified PAM - some longer description...'
    }
  ];

	res.send(compiledFunction({
    classes: classes
  }));
});

app.get('/createasset', async function (req, res) {
  const classId = req.body.classid;
  const compiledFunction = pug.compileFile('src/templates/createasset.pug');

  // Load class from DB and determine what fields we need from the Lender
  const fields = ['Loan Amount', 'Interest Rate', 'Maturity Date', 'Debtor Address'];
  const bal = await nemApi.getBalance(config.lenderAddress);
  const defaultMaturityDate = moment(new Date()).add(5, 'm').format("YYYY-MM-DD HH:mm").toString();

	res.send(compiledFunction({
    name: "sPAM",
    fields: fields,
    balance: bal,
    maturity: defaultMaturityDate
  }));
});

app.post('/createasset', async function (req, res) {

  // Extract asset parameters
  // console.log("POST: ", req.body);
  const amount = req.body['Loan Amount'];
  const interestRate = req.body['Interest Rate'] / 100.0;
  const maturityDate = req.body['Maturity Date'];

  // Calcaulte interest amount to be paid at maturity
  const timeNow = moment(new Date());
  const dueTime = moment(maturityDate, "YYYY-MM-DD HH:mm");
  const interestSeconds = dueTime.diff(timeNow, 'seconds');
  //console.log("interestSeconds = ", interestSeconds);
  const interestAmount = amount * interestRate * interestSeconds / (365*24*3600);
  console.log("interestAmount = ", interestAmount);

  // 1. Create loan payout transaction (produce internal tx ID)
  let nemTx = await nemApi.initiateAggregateTransaction(config.lenderPublicKey, config.debtorPublicKey, amount);
  let dbTxId = await model.addPayoutTransaction(nemTx);

  // 2. Create asset and associate with payout transaction by internal tx ID
  const asset = {
    className: 'sPAM',
    txId: dbTxId,
    loanAmount: amount,
    interestRate: interestRate,
    interestAmount: interestAmount,
    openDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm").toString(),
    maturityDateTime: maturityDate,
  }
  await model.addAsset(asset);

	res.send("<script>window.location.href='/assets'</script>");
});

function getAssetStatus(asset) {
  let status = '';
  if (asset.tx_status == 'pending')
    status = 'Pending';
  else if (asset.paid_off == true)
    status = 'Paid';
  else if (moment(asset.maturity_dt, "YYYY-MM-DD HH:mm").isAfter(moment()))
    status = 'Current';
  else
    status = 'Overdue';
  return status;
}

async function getAssets() {
  // Get assets from DB
  const assets = await model.getAllAssets();

  // Round interest amounts
  for (let i=0; i<assets.length; i++) {
    assets[i].interest_amount = parseInt(1000 * parseFloat(assets[i].interest_amount))/1000;
    assets[i].open_dt = moment(assets[i].open_dt, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm").toString()
    assets[i].maturity_dt = moment(assets[i].maturity_dt, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm").toString()
  }

  // Process asset statuses
  for (let i=0; i<assets.length; i++) {
    assets[i].asset_status = getAssetStatus(assets[i]);
  }

  return assets;
}

app.get('/assets', async function (req, res) {
  const compiledFunction = pug.compileFile('src/templates/assets.pug');

	res.send(compiledFunction({
    assets: await getAssets()
  }));
});

app.get('/debtorlogin', function (req, res) {
  const compiledFunction = pug.compileFile('src/templates/debtorlogin.pug');
	res.send(compiledFunction({}));
});

app.get('/debtor', function (req, res) {
  const compiledFunction = pug.compileFile('src/templates/debtor.pug');
	res.send(compiledFunction({}));
});

app.get('/loans', async function (req, res) {
  const compiledFunction = pug.compileFile('src/templates/loans.pug');

	res.send(compiledFunction({
    assets: await getAssets(),
    balance: await nemApi.getBalance(config.debtorAddress)
  }));
});

app.get('/cosign', async function (req, res) {
  const assetId = req.query.id;
  const compiledFunction = pug.compileFile('src/templates/cosign.pug');

  // Get loan from DB
  const asset = await model.getAssetById(assetId);

	res.send(compiledFunction({
    assetId: assetId,
    asset: asset
  }));
});

app.get('/docosign', async function (req, res) {
  const assetId = req.query.id;

  // Get aggregate transaction from DB
  const asset = await model.getAssetById(assetId);

  // Cosign
  if (asset.tx_status == 'pending')
    await nemApi.cosignAggregateTransaction(asset.serialized, config.lenderPrivateKey, config.debtorPrivateKey);

  // Set transaction complete
  await model.setTransactionCompleteStatus(asset.tx_id);

  res.send("<script>window.location.href='/loans'</script>");
});

app.get('/pay', async function (req, res) {
  const assetId = req.query.id;
  const compiledFunction = pug.compileFile('src/templates/pay.pug');

  // Get loan from DB
  const asset = await model.getAssetById(assetId);

	res.send(compiledFunction({
    assetId: assetId,
    asset: asset,
    balance: await nemApi.getBalance(config.debtorAddress)
  }));
});

app.get('/dopay', async function (req, res) {
  const assetId = req.query.id;

  // Get aggregate transaction from DB
  const asset = await model.getAssetById(assetId);
  console.log("asset = ", asset);

  // Send payment to lender
  if (!asset.paid_off)
    await nemApi.simpleTransaction(config.debtorPrivateKey, config.lenderAddress, asset.loan_amount + asset.interest_amount);

  // Mark loan as paid off
  await model.setAssetPaid(assetId);
 
  res.send("<script>window.location.href='/loans'</script>");
});

app.get('/details', async function (req, res) {
  const assetId = req.query.id;
  const compiledFunction = pug.compileFile('src/templates/details.pug');

  // Get loan from DB
  const asset = await model.getAssetById(assetId);

  // Calculate status
  asset.asset_status = getAssetStatus(asset);

  // Calculate accrued interest to date
  const openTime = moment(asset.open_dt, "YYYY-MM-DD HH:mm");
  const timeNow = moment(new Date());
  const interestSeconds = timeNow.diff(openTime, 'seconds');
  let accruedInterest = asset.loan_amount * asset.interest_rate * interestSeconds / (365*24*3600);
  if (accruedInterest > asset.interest_amount)
    accruedInterest = asset.interest_amount;

  // Calculate total due amount (in case if status if Overdue, otherwise it is 0)
  let dueNow = 0;
  if (asset.asset_status == 'Overdue') {
    dueNow = asset.loan_amount + asset.interest_amount;
  }

	res.send(compiledFunction({
    asset: asset,
    accruedInterest: accruedInterest,
    dueNow
  }));
});

app.get('/test', async function (req, res) {

  // 1. Generate aggregate complete tx
  let tx = await nemApi.initiateAggregateTransaction(config.lenderPublicKey, config.debtorPublicKey, 1000);

  // 2. Cosign and announce tx
  await nemApi.cosignAggregateTransaction(tx, config.lenderPrivateKey, config.debtorPrivateKey);

	res.send('OK');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
