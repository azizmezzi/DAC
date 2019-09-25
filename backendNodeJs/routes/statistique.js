var express = require("express");
var router = express.Router();
let mysqlConnect = require("./connectionDB/db");

/* GET home page. */
router.get("/MoyenPoid", function(req, res, next) {
  mysqlConnect.query("SELECT weight FROM vache", (err, resultat) => {
    if (!err) {
      let somme = 0;
      let number = 0;
      for (let i = 0; i < resultat.length; i++) {
        if (resultat[i].weight !== 0) {
          somme = +resultat[i].weight;
          number++;
        }
      }
      const moyen = somme / number;
      console.log("somme");
      console.log(somme);
      return res.json({
        data: resultat,
        result: moyen,
        total: number
      });
    } else res.send(rows);
  });
  // res.render('index', { title: 'sec' });
});

router.get("/stats", function(req, res, next) {
  var datas = [];
  mysqlConnect.query("SELECT * FROM DAC", (err, resultat) => {
    if (!err) {
      for (let i = 0; i < resultat.length; i += 1) {
        mysqlConnect.query(
          "SELECT * FROM log WHERE idDac = ?",
          resultat[i].idDAC,
          (err, resu) => {
            if (!err) {
              var value = 0;

              for (let j = 0; j < resu.length; j++) {
                value += resu[j].QtManager;
              }

              datas.push({ lable: resultat[i].DACName, value });

              if (i === resultat.length - 1) {
                return res.json({
                  data: datas
                });
              }
            } else res.send(err);
          }
        );
      }
    } else res.send(err);
  });

  // res.render('index', { title: 'sec' });
});

module.exports = router;
