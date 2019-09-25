
var express = require('express');
var router = express.Router();
let mysqlConnect = require('./connectionDB/db')

/* GET home page. */
router.get('/', function (req, res, next) {
    mysqlConnect.query('SELECT * FROM Groupe', (err, resultat) => {
        if (!err) {
            return res.json({
                data: resultat
            })
        }
        else
            res.send(rows)

    })
    // res.render('index', { title: 'sec' });
});

router.post('/', function (req, res, next) {
    var GroupeName = req.body.GroupeName
    var note = req.body.note
    const requete = "INSERT INTO Groupe (GroupeName,note) VALUES (?,?)"
    mysqlConnect.query(requete, [GroupeName, note], (err, resultat, fields) => {
        if (err) {
            return res.send({ data: "error" })
        } else {

            return res.send({ data: resultat.insertId })
        }

    });

});
router.post('/delete', function (req, res, next) {
    console.log(req.body.ids)

    mysqlConnect.query('DELETE FROM Groupe where idGroupe = ?', [req.body.ids], (err, rows, fields) => {
        if (!err)
            res.send('delete')
        else
            console.log(err)
    })

});
router.post('/update', function (req, res, next) {
    const body = JSON.parse(req.body.post)
    const group = JSON.parse(body.group)


    var idGroupe_vachesNew = JSON.parse(body.idGroupe_vachesNew)
    var GroupDiet = JSON.parse(body.GroupDiet)
    var DietCowEdited = JSON.parse(body.DietCowEdited)


    const reqete = "UPDATE Groupe SET GroupeName = ? ,  note = ? where idGroupe = ?";

    mysqlConnect.query(reqete, [group.GroupeName, group.note, group.idGroupe], (err, resultat) => {
        if (!err) {
            const requete = "DELETE FROM Groupe_vaches WHERE idGroupe = ?"
            mysqlConnect.query(requete, [group.idGroupe], (err, resultat, fields) => {
                if (err) {
                    console.log(err)
                } else {

                    for (let i = 0; i < idGroupe_vachesNew.length; i++) {
                        const requete = "INSERT INTO Groupe_vaches (idGroupe, idVache ) VALUES (?,?)"
                        mysqlConnect.query(requete, [group.idGroupe, idGroupe_vachesNew[i]], (err, resultat, fields) => {
                            if (err) {
                                console.log(err)
                            } else {
console.log('Groupe_vache Done')
                            }
                        });
                    }
                    mysqlConnect.query('DELETE FROM Diet_Group where idGroup = ?',
                        [group.idGroupe], (err, rows, fields) => {
                            if (!err) {
                                for (let i = 0; i < GroupDiet.length; i++) {
                                    console.log("aaaaaaaaaaaaaaaa" + i)
                                    console.log(parseInt(GroupDiet[i].idDiet))
                                    console.log(parseInt(GroupDiet[i].begin))
                                    const end = new Date(GroupDiet[i].end)
                                    const begin = new Date(GroupDiet[i].begin)
                                    const requete = "INSERT INTO Diet_Group (idDiet, idGroup, begin ,end) VALUES (?,?,?,?)"
                                    mysqlConnect.query(requete,
                                        [
                                            parseInt(GroupDiet[i].idDiet),
                                            group.idGroupe,
                                            begin,
                                            end
                                        ], (err, resultat, fields) => {
                                            if (err) {
                                                console.log(err)
                                            } else {
                                            
                                            }
                                        });
                                }
                                console.log('delete')
                            }
                            else {

                                console.log(err)
                            }
                        })
                        for (let j = 0; j < DietCowEdited.length; j++) {

                            mysqlConnect.query('DELETE FROM Diet_Cow where idCow = ?',
                                [DietCowEdited[j]], (err, rows, fields) => {
                                    if (!err) {
                                        console.log('delete')

                                        for (let i = 0; i < GroupDiet.length; i++) {
                                            const begin = new Date(GroupDiet[i].begin)
                                            const end = new Date(GroupDiet[i].end)
                                            console.log('*********************')

                                            const requete = "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)"
                                            mysqlConnect.query(requete,
                                                [
                                                    parseInt(GroupDiet[i].idDiet),
                                                    parseInt(DietCowEdited[j]),
                                                    begin,
                                                    end], (err, resultat, fields) => {
                                                        if (err) {
                                                            console.log(err)
                                                        }
                                                    });
                                        }


                                    }

                                    else
                                        console.log(err)
                                })
                        }
                }
            });
            res.send({ data: 'update' })

        }
        else {
            res.send(err)
            console.log(err)
        }

    })



});
router.post('/updateGroupe', function (req, res, next) {
    console.log(req.body.id)
    console.log(req.body.note)
    const reqete = "UPDATE Groupe SET note = ? where idGroupe = ?";

    mysqlConnect.query(reqete, [req.body.note, req.body.id], (err, resultat) => {
        if (!err) {
            console.log('update')
            return res.send({ data: 'update' })
        }

        else
            console.log(err)

    })



});

router.delete('/', function (req, res, next) {
    console.log(req.body.ids)

    mysqlConnect.query('DELETE FROM Groupe where idGroupe = ?', [req.body.ids], (err, rows, fields) => {
        if (!err)
            res.send('delete')
        else
            console.log(err)
    })

});
module.exports = router;
