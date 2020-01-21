const config = require("./config");
const mysql = require('mysql');

class Model {

  async _runQuery(query) {
    let connection = mysql.createConnection({
      host     : config.db_host,
      user     : config.db_user,
      password : config.db_password,
      database : config.db_name
    });
     
    return new Promise(function(resolve, reject) {
      connection.connect(function(cerr) {
        if (cerr) {
          console.error("Connection error: ", cerr);
          reject(cerr);
        }

        connection.query(query, function (err, results) {
          if (err) {
            console.error("Query error: ", err);
            reject(err);
          } else {
            resolve(results);
          }
        });
  
        connection.end();
      });
    });
  }

  async addPayoutTransaction(txStr) {
    const query = `INSERT INTO payout_transaction (serialized, tx_status) VALUES ('${txStr}', 'pending');`;
    const insertResult = await this._runQuery(query);
    return insertResult.insertId;
  }

  async addAsset(asset) {
    const query = `
      INSERT INTO asset (class_name, tx_id, loan_amount, interest_rate, interest_amount, open_dt, maturity_dt)
      VALUES (
        '${asset.className}',
        ${asset.txId},
        ${asset.loanAmount},
        ${asset.interestRate},
        ${asset.interestAmount},
        '${asset.openDateTime}',
        '${asset.maturityDateTime}'
      )
    `;
    //console.log('Query: ', query);
    const insertResult = await this._runQuery(query);
    return insertResult.insertId;
  }

  async getAllAssets() {
    return await this._runQuery(`
      SELECT 
        a.id as id,
        class_name, 
        tx_id, 
        loan_amount, 
        interest_rate, 
        interest_amount, 
        open_dt, 
        maturity_dt,
        paid_off,
        pt.serialized as serialized,
        pt.tx_status as tx_status
      FROM asset a INNER JOIN payout_transaction pt ON a.tx_id = pt.id
    `);
  }

  async getAssetById(assetId) {
    const assets = await this._runQuery(`
      SELECT 
        a.id as id,
        class_name, 
        tx_id, 
        loan_amount, 
        interest_rate, 
        interest_amount, 
        open_dt, 
        maturity_dt,
        paid_off,
        pt.serialized as serialized,
        pt.tx_status as tx_status
      FROM asset a INNER JOIN payout_transaction pt ON a.tx_id = pt.id
      WHERE a.id = ${assetId}
    `);
    return assets[0];
  }

  async getPendingTransactions() {
    return await this._runQuery(`select * from payout_transaction where tx_status = 'pending';`);
  }

  async setTransactionCompleteStatus(txId) {
    const query = `
      UPDATE payout_transaction 
      SET tx_status='complete' 
      WHERE id=${txId}
    `;
    await this._runQuery(query);
  }

  async setAssetPaid(assetId) {
    console.log("Seeting as paid off: ", assetId);
    const query = `
      UPDATE asset
      SET paid_off=TRUE 
      WHERE id=${assetId};
    `;
    await this._runQuery(query);
  }

};
  
module.exports = Model;

// Tests
// async function test() {
//   let m = new Model();
//   let results = '';

//   // results = await m._runQuery('select * from payout_transaction;');
//   // console.log('Select query results: ', results);

//   // results = await m.addPayoutTransaction('{}');
//   // console.log('Insert query results: ', results);

//   await m.setTransactionCompleteStatus(3);
//   results = await m.getPendingTransactions();
//   console.log('Pending transactions: ', results);

// }
// test().then(() => { process.exit() });