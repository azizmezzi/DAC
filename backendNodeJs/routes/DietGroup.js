var express = require('express');
var router = express.Router();
let mysqlConnect = require('./connectionDB/db')

router.get('/', function (req, res, next) {
    var idGroup = req.query.idGroup
    console.log(req.query.idGroup)
    mysqlConnect.query('SELECT * FROM Diet_Group WHERE idGroup = ' + idGroup, (err, resultat) => {
        if (!err) {
            return res.json({
                data: resultat
            })
        }
        else res.send(err)

    })
});
router.get('/All', function (req, res, next) {

    mysqlConnect.query('SELECT * FROM Diet_Group  ', (err, resultat) => {
        if (!err) {
            return res.json({
                data: resultat
            })
        }
        else console.log(err)

    })
});
router.post('/', function (req, res, next) {
    var idDiet = req.body.idDiet
    var idGroup = req.body.idGroup
    var begin = req.body.begin
    var end = req.body.end
    console.log("*********")

    console.log("idDiet")
    console.log(idDiet)
    console.log("idCow")
    console.log(idGroup)
    console.log("begin")
    console.log(begin)
    console.log(end)
    const requete = "INSERT INTO Diet_Group (idDiet, idGroup, begin  ,end) VALUES (?,?,?,?)"
    mysqlConnect.query(requete, [idDiet, idGroup, begin, end], (err, resultat, fields) => {
        if (err) {
            console.log(err)
        }else console.log('success')
    });

});
router.post('/delete', function (req, res, next) {
    console.log("delete")
    console.log(req.body.ids)

    mysqlConnect.query('DELETE FROM Diet_Group where idDiet_Group = ?', [req.body.ids], (err, rows, fields) => {
        if (!err)
            console.log('delete')
        else
            console.log(err)
    })

});
router.post('/update', function (req, res, next) {
    var idDiet_Group = req.body.idDiet_Group
    var idDiet = req.body.idDiet
    var idGroup = req.body.idGroup
    var begin = req.body.begin
    var end = req.body.end
    console.log("*********")

    console.log("idDiet")
    console.log(idDiet)
    console.log("idCow")
    console.log(idGroup)
    console.log("begin")
    console.log(begin)
    console.log(end)
    const reqete = "UPDATE Diet_Group      SET idDiet = ? ,  idGroup = ? ,  begin = ?,  end = ? where idDiet_Group  = ?";

    mysqlConnect.query(reqete,
        [
            idDiet,
            idGroup,
            begin,
            end,
            idDiet_Group
        ], (err, resultat) => {
            if (!err) {
                console.log('update')
                return res.send('update')
            }
            else {
                console.log(err)
                res.send(err)
            }

        })

});

router.post('/Edit', function (req, res, next) {
    var body = JSON.parse(req.body.post)
    var GroupDietDeleted = JSON.parse(body.GroupDietDeleted)
    var GroupDiet = JSON.parse(body.GroupDiet)
    var GroupDietAdd = JSON.parse(body.GroupDietAdd)
    var idGroupe = body.idGroupe

    for (let j = 0; j < GroupDietDeleted.length; j++) {

        mysqlConnect.query('DELETE FROM Diet_Group where idDiet_Group = ?',
            [GroupDietDeleted[j]], (err, rows, fields) => {
                if (!err)
                    console.log('delete')
                else
                    console.log(err)
            })
    }
    for (let i = 0; i < GroupDiet.length; i++) {
        const begin = new Date(GroupDiet[i].begin)
        const end = new Date(GroupDiet[i].end)
        console.log("*********************")
        console.log(begin)
        const reqete = "UPDATE Diet_Group SET idDiet = ? , idGroup = ? , begin = ?, end = ? where idDiet_Group  = ?";

        mysqlConnect.query(reqete,
            [
                GroupDiet[i].idDiet,
                GroupDiet[i].idGroup,
                begin,
                end,
                GroupDiet[i].idDiet_Group
            ], (err, resultat) => {
                if (!err)
                    console.log('update')
                else
                    console.log(err)

            })
        // this.updateMethodeGroupDiet(GroupDiet[i], idGroup);
    }


    for (let i = 0; i < GroupDietAdd.length; i++) {
        console.log("parseInt(GroupDietAdd[i].idDiet)")
        console.log(parseInt(GroupDietAdd[i].idDiet))
        console.log(parseInt(GroupDietAdd[i].begin))
        const end = new Date(GroupDietAdd[i].end)
        const begin = new Date(GroupDietAdd[i].begin)
        const requete = "INSERT INTO Diet_Group (idDiet, idGroup, begin ,end) VALUES (?,?,?,?)"
        mysqlConnect.query(requete,
            [
                parseInt(GroupDietAdd[i].idDiet),
                idGroupe,
                begin,
                end
            ], (err, resultat, fields) => {
                if (err) {
                    {
                        console.log(err)
                        return res.send(err)
                    }
                }
            });
    }
    return res.send("done")


});

module.exports = router;
