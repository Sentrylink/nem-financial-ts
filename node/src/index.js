const BigNumber = require('bignumber.js');
const bodyParser = require('body-parser');
const config = require('./config');
const express = require('express');
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
// Initialize NEM SDK

const nemApi = new NemAPI(config.apiUrl);



/*
const address = Address.createFromRawAddress(config.lenderAddress);
const repositoryFactory = new RepositoryFactoryHttp(config.apiUrl);
const accountHttp = repositoryFactory.createAccountRepository();

accountHttp
    .getAccountInfo(address)
    .subscribe((accountInfo) => 
      {
        //console.log("Mosaic ID: ", accountInfo.mosaics[0].id);
        console.log("Balance: ", BigNumber(accountInfo.mosaics[0].amount).toFixed());
      },
      (err) => console.error(err));
*/


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
  const fields = ['Debt Amount', 'Interest Rate', 'Maturity Date', 'Debtor Address'];
  const bal = await nemApi.getBalance(config.lenderAddress);

	res.send(compiledFunction({
    name: "sPAM",
    fields: fields,
    balance: bal
  }));
});

app.post('/createasset', function (req, res) {
  console.log("POST: ", req.body);
	res.send("OK");
});


app.get('/assets', function (req, res) {
  const compiledFunction = pug.compileFile('src/templates/assets.pug');
	res.send(compiledFunction({
    
  }));
});

app.get('/test', async function (req, res) {

  let b = await nemApi.getBalance(config.lenderAddress);

	res.send('Balance: ' + BigNumber(b).toFixed());
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
