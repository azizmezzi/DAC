
var express = require('express');
var router = express.Router();
let mysqlConnect = require('./connectionDB/db')

router.get('/', function (req, res, next) {
    var idGroupe = req.query.idGroupe
    console.log(req.query.idGroupe)
    mysqlConnect.query('SELECT * FROM Groupe_vaches WHERE idGroupe = ' + idGroupe, (err, resultat) => {
        if (!err) {
            return res.json({
                data: resultat
            })
        }
        else res.send(err)

    })
});
router.get('/All', function (req, res, next) {
    
 
    mysqlConnect.query('SELECT * FROM Groupe_vaches' , (err, resultat) => {
        if (!err) {
            return res.json({
                data: resultat
            })
        }
        else console.log(err)

    })
});
router.get('/Cow', function (req, res, next) {
    var idCow = req.query.idCow
    console.log(req.query.idCow)
    mysqlConnect.query('SELECT * FROM Groupe_vaches WHERE idVache = ' + idCow, (err, resultat) => {
        if (!err) {
            return res.json({
                data: resultat
            })
        }
        else res.send(err)

    })
});
router.post('/', function (req, res, next) {
    var body = JSON.parse(req.body.post)
    var vachesState = JSON.parse(body.vachesState)
    var idGroupe = JSON.parse(body.idGroupe)

    console.log("*******2222222222******")
    console.log(idGroupe)
    console.log("**********************")
    console.log(vachesState)
    var leng = vachesState.length
    for (let i = 0; i < leng; i++) {
        if (vachesState[i].existance) {

            const requete = "INSERT INTO Groupe_vaches (idGroupe, idVache ) VALUES (?,?)"
            mysqlConnect.query(requete, [idGroupe, vachesState[i].id], (err, resultat, fields) => {
                if (err) {
                    console.log(err)
                }
            });
        }

    }
    });

router.post('/delete', function (req, res, next) {

    var idGroupe_vaches = req.body.idGroupe_vaches
    console.log(idGroupe_vaches)
    const requete = "DELETE FROM Groupe_vaches WHERE idGroupe_vaches = ?"
    mysqlConnect.query(requete, [idGroupe_vaches], (err, resultat, fields) => {
        if (err) {
            console.log(err)
            return res.send(err)

        }else {
            return res.send('done')
        }
    });



});

router.get('/compare', function (req, res, next) {
    var idGroupe = req.query.idGroupe
    console.log(req.query.idGroupe)
    
    mysqlConnect.query('SELECT * FROM Groupe_vaches WHERE idGroupe = ' + idGroupe, (err, resultat) => {
        if (!err) {
            mysqlConnect.query('SELECT * FROM Diet_Group WHERE idGroup = ' + idGroup, (err, resultat) => {
                if (!err) {
                    return res.json({
                        data: resultat
                    })
                }
                else res.send(rows)
        
            })
            return res.json({
                data: resultat
            })
        }
        else res.send(rows)

    })
});
module.exports = router;
