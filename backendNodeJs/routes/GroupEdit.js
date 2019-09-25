var express = require('express');
var router = express.Router();
let mysqlConnect = require('./connectionDB/db')


router.post('/', function (req, res, next) {
    var idGroupe = req.body.idGroupe
    var idGroupe_vachesOld = req.body.idGroupe_vachesOld
    var idGroupe_vachesNew = req.body.idGroupe_vachesNew
   
    console.log("*********")

    console.log("idGroupe")
    console.log(idGroupe)
    console.log("idGroupe_vachesOld")
    console.log(idGroupe_vachesOld)
    console.log("idGroupe_vachesNew")
    console.log(idGroupe_vachesNew)
    console.log(idGroupe_vachesNew.length)
    const tabidGroupe_vachesNew = idGroupe_vachesNew.split(',')
    for(let i=0;i<tabidGroupe_vachesNew.length;i++){
    console.log("**************")
    tabidGroupe_vachesNew[i]=parseInt(tabidGroupe_vachesNew[i])
        console.log(tabidGroupe_vachesNew[i])
    }
  
        const requete = "DELETE FROM Groupe_vaches WHERE idGroupe = ?"
        mysqlConnect.query(requete, [idGroupe], (err, resultat, fields) => {
            if (err) {
                console.log(err)
            }
        });
    
    for(let i=0;i<tabidGroupe_vachesNew.length;i++){
        const requete = "INSERT INTO Groupe_vaches (idGroupe, idVache ) VALUES (?,?)"
    mysqlConnect.query(requete, [idGroupe, tabidGroupe_vachesNew[i]], (err, resultat, fields) => {
        if (err) {
            console.log(err)
        }
    });
    }
   return res.send('done')
});
module.exports = router;