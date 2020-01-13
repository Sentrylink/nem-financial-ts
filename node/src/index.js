const bodyParser = require('body-parser');
const express = require('express');
const pug = require('pug');
const session = require('express-session');

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

let sessions = {};

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

app.get('/createasset', function (req, res) {
  const classId = req.body.classid;
  const compiledFunction = pug.compileFile('src/templates/createasset.pug');

  // Load class from DB and determine what fields we need from the Lender
  const fields = ['Debt Amount', 'Interest Rate', 'Maturity Date', 'Debtor Address'];

	res.send(compiledFunction({
    name: "sPAM",
    fields: fields
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


// Для получения переменных из HTML формы
// let login = req.body.login,


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
