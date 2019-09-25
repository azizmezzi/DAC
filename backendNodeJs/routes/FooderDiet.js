var express = require("express");
var router = express.Router();
let mysqlConnect = require("./connectionDB/db");

router.get("/", function(req, res, next) {
  var idDiet = req.query.idDiet;
  console.log(req.query.idDiet);
  mysqlConnect.query(
    "SELECT * FROM Diet_Fodder WHERE idDiet = " + idDiet,
    (err, resultat) => {
      if (!err) {
        return res.json({
          data: resultat
        });
      } else res.send(rows);
    }
  );
});

router.post("/", function(req, res, next) {
  var idFooder = req.body.idFooder;
  var idDiet = req.body.idDiet;
  var quantite = parseInt(req.body.quantite);
  var Portion = parseInt(req.body.Portion);
  var Priority = req.body.Priority;
  const requete =
    "INSERT INTO Diet_Fodder (idFooder,idDiet, Portion, quantite ,Priority) VALUES (?,?,?,?,?)";
  mysqlConnect.query(
    requete,
    [idFooder, idDiet, Portion, quantite, Priority],
    (err, resultat, fields) => {
      if (err) {
        console.log(err);
      } else console.log('success')
    }
  );
});
router.post("/update", function(req, res, next) {
  var body = JSON.parse(req.body.post);
  var idDiet = JSON.parse(body.idDiet);
  var FooderDiet = JSON.parse(body.FooderDiet);
  console.log(FooderDiet);
  mysqlConnect.query(
    "DELETE FROM Diet_Fodder where idDiet = ?",
    [idDiet],
    (err, rows, fields) => {
      if (!err) {
        console.log("delete");
        for (let i = 0; i < FooderDiet.length; i++) {
          const requete =
            "INSERT INTO Diet_Fodder (idFooder,idDiet, Portion, quantite ,Priority) VALUES (?,?,?,?,?)";
          mysqlConnect.query(
            requete,
            [
              FooderDiet[i].idFooder,
              idDiet,
              parseInt(FooderDiet[i].Portion),
              parseInt(FooderDiet[i].quantite),
              FooderDiet[i].Priority
            ],
            (err, resultat, fields) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      } else console.log(err);
    }
  );
});
router.post("/delete", function(req, res, next) {
  mysqlConnect.query(
    "DELETE FROM Diet_Fodder where idDiet_Fodder = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) console.log("delete");
      else console.log(err);
    }
  );
});
module.exports = router;
