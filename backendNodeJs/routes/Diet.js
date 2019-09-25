                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
var express = require('express');
var router = express.Router();
let mysqlConnect = require('./connectionDB/db')

/* GET home page. */
router.get('/', function (req, res, next) {
    mysqlConnect.query('SELECT * FROM Diet', (err, resultat) => {
        if (!err) {
            return res.json({
                data: resultat
            })
        }
        else
            res.send(err)

    })
    // res.render('index', { title: 'sec' });
});

router.post('/', function (req, res, next) {
    var DietName = req.body.DietName
    const requete = "INSERT INTO Diet (DietName) VALUES (?)"
    mysqlConnect.query(requete, [DietName], (err, resultat, fields) => {
        if (err) {
            return res.send ({data :"error"})
        }else {
            
           return res.send ({data :resultat.insertId})
        }

    });

});
router.post('/delete', function (req, res, next) {
    console.log(req.body.ids)

    mysqlConnect.query('DELETE FROM Diet where idDiet = ?', [req.body.ids], (err, rows, fields) => {
        if (!err)
            res.send('delete')
        else
            console.log(err)
    })

});
router.post('/update', function (req, res, next) {
    console.log(req.body.idDiet)
  const reqete = "UPDATE Diet SET   DietName = ? where idDiet = ?" ;
  
  mysqlConnect.query(reqete, [req.body.DietName ,req.body.idDiet],(err,resultat)=>{
    if (!err)
    console.log('update')
else
    console.log(err)

  })



});
/*
router.get('/diet', function (req, res, next) {
    var idDiet = req.query.idDiet
    console.log(req.query.idDiet)
    mysqlConnect.query('SELECT DietName FROM Diet WHERE idDiet = ' + idDiet, (err, resultat) => {
        if (!err) {
            return res.json({
                data: resultat
            })
        }
        else res.send(rows)

    })
});*/

router.delete('/', function (req, res, next) {
    console.log(req.body.ids)

    mysqlConnect.query('DELETE FROM Diet where idDiet = ?', [req.body.ids], (err, rows, fields) => {
        if (!err)
            res.send('delete')
        else
            console.log(err)
    })

});
module.exports = router;
