
var express = require('express');
var router = express.Router();
let mysqlConnect = require('./connectionDB/db')

/* GET home page. */
router.get('/', function (req, res, next) {
    mysqlConnect.query('SELECT * FROM Notification', (err, resultat) => {
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
    var idUser = parseInt(req.body.idUser)
    var Notifications = req.body.Notifications
    const requete = "INSERT INTO Notification (idUser , Notifications) VALUES (? , ?)"
    mysqlConnect.query(requete, [idUser, Notifications], (err, resultat, fields) => {
        if (err) {
            console.log(err)
        }

    });

});

router.post('/delete', function (req, res, next) {
    console.log(req.body.ids)

    mysqlConnect.query('DELETE FROM Notification where idNotification = ?', [req.body.ids], (err, rows, fields) => {
        if (!err)
            res.send('delete')
        else
            console.log(err)
    })

});
router.post('/update', function (req, res, next) {
    const DateNotification = new Date(req.body.DateNotification)
    console.log(req.body.Notification)
    const reqete = "UPDATE Notification SET   Notifications= ? , type = ? ,DateNotification=? where idNotification = ?";
    mysqlConnect.query(reqete, [
        req.body.Notification, 
        parseInt(req.body.type), 
        DateNotification, 
        req.body.idNotification], (err, resultat) => {
        if (!err)
            console.log('update')
        else
            console.log(err)

    })



});
module.exports = router;
