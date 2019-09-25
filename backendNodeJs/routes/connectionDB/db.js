const mysql = require('mysql');

var mysqlConnect = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'xNNmmY4HBC',
  password: 'E7eYnCPrPR',
  database: 'xNNmmY4HBC'
});

/*
var mysqlConnect = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'VJm1hV7qqj',
  password: '2lbk38Hto3',
  database: 'VJm1hV7qqj'
});
*/
process.setMaxListeners(0);
/*
var mysqlConnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'base_donnee'
});*/
mysqlConnect.connect((err) => {
  if (!err)
      console.log('db success')
  else
      console.log('error')
});

module.exports=mysqlConnect;
