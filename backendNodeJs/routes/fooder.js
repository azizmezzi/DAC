var express = require("express");
var router = express.Router();
let mysqlConnect = require("./connectionDB/db");

/* GET home page. */
router.get("/", function(req, res, next) {
  mysqlConnect.query("SELECT * FROM Fooder", (err, resultat) => {
    if (!err) {
      return res.json({
        data: resultat
      });
    } else res.send(rows);
  });
  // res.render('index', { title: 'sec' });
});

router.post("/", function(req, res, next) {
  var FooderName = req.body.FooderName;
  var density = parseInt(req.body.density);
  console.log(density);
  const requete = "INSERT INTO Fooder (FooderName , density) VALUES (? , ?)";
  mysqlConnect.query(
    requete,
    [FooderName, density],
    (err, resultat, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resultat.insertId);
        return res.send({ data: resultat.insertId });
      }
    }
  );
});

router.post("/delete", function(req, res, next) {
  console.log(req.body.ids);

  mysqlConnect.query(
    "DELETE FROM Fooder where idFooder = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) res.send("delete");
      else console.log(err);
    }
  );
});
router.post("/update", function(req, res, next) {
  console.log(req.body.FooderName);
  const reqete =
    "UPDATE Fooder SET   FooderName = ? , density= ? where idFooder = ?";
  mysqlConnect.query(
    reqete,
    [req.body.FooderName, parseInt(req.body.density), req.body.idFooder],
    (err, resultat) => {
      if (!err) {
        console.log("update");
        return res.send("update");
      } else console.log(err);
    }
  );
});

router.delete("/", function(req, res, next) {
  console.log(req.body.ids);

  mysqlConnect.query(
    "DELETE FROM Fooder where idFooder = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) res.send("delete");
      else console.log(err);
    }
  );
});
module.exports = router;
