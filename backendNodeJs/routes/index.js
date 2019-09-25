var express = require('express');
var router = express.Router();
/*const mysql = require('mysql');


var mysqlConnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'base_donnee'
});

mysqlConnect.connect((err) => {
  if (!err)
      console.log('db success')
  else
      console.log('error')
});


router.get('/', function(req, res, next) {
  mysqlConnect.query('SELECT * FROM vache', (err, resultat) => {
    if (!err) {
        return res.json({
            data: resultat
        })
    }
    else
        res.send(rows)

})});

router.post('/', function(req, res, next) {
  const val = req.body.val
  console.log(req.body )
  res.send({val})
});*/
module.exports = router;
