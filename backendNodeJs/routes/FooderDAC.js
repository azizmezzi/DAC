var express = require('express');
var router = express.Router();
let mysqlConnect = require('./connectionDB/db')

router.get('/', function (req, res, next) {
    var idDAC = req.query.idDAC
    console.log(req.query.idDAC)
    mysqlConnect.query('SELECT * FROM Fooder_DAC WHERE idDAC = ' + idDAC, (err, resultat) => {
        if (!err) {
            console.log(resultat)
            return res.json({
                data: resultat
            })
        }
        else res.send(rows)

    })
});
router.post('/', function (req, res, next) {
    var body = JSON.parse(req.body.post)
    var Fooder = JSON.parse(body.Fooder)
    var idDAC = JSON.parse(body.idDAC)
    mysqlConnect.query('DELETE FROM Fooder_DAC where idDAC = ?', [idDAC], (err, rows, fields) => {
        if (!err) {
            console.log('delete')
            for (let i = 0; i < Fooder.length; i++) {
                if (Fooder[i].existance) {
                    const requete = "INSERT INTO Fooder_DAC (idFodder,idDAC) VALUES (?,?)"
                    mysqlConnect.query(requete, [Fooder[i].idFooder, idDAC], (err, resultat, fields) => {
                        if (err) {
                            console.log(err)
                        }
                    });

                }

            }

        }

        else
            console.log(err)
    })

});
module.exports = router;
