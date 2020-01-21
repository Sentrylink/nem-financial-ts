// Setup private testnet first on localhost: 
// https://nemtech.github.io/guides/network/creating-a-private-test-net.html

const Config = {
    
  apiUrl                     : 'http://localhost:3000',
  lenderAddress              : 'TBVBAP-62HEQL-GTT5ZC-GGHPBX-7NCX7A-GJDQI6-LUS7', // Alice
  lenderPrivateKey           : '44CB1C8A898A289DA6DE0008BA4AC0D06F21416515C3CCE5E48FC64322956A80',
  lenderPublicKey            : 'D6BFEEDE5A6612E7E36CEB82DD2A2F0A95CE98DCBD2AD4C1F351D4DDE13C536A',
  debtorAddress              : 'TCGRAE-7DHO2E-OBSE5V-FUKVQC-AZ2ZLT-Z5FLKK-TYS5', // Bob
  debtorPrivateKey           : 'D730CD27340305A64597AC786374DEF9E57302D1BFDFF21A5CB6CF3AF376982B',
  debtorPublicKey            : '7654205C311D5B89255BE8FB3229C321F3666ECFFBD433F2E953C6DDF8E55FA4',

  db_name                    : 'nem_financial',
  db_host                    : 'localhost',
  db_user                    : 'root',
  db_password                : '',
};
  
module.exports = Config;
