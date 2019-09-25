var express = require("express");
var router = express.Router();
let mysqlConnect = require("./connectionDB/db");

/* GET home page. */
router.get("/", function(req, res, next) {
  mysqlConnect.query("SELECT * FROM USER", (err, resultat) => {
    if (!err) {
      return res.json({
        data: resultat
      });
    } else {
      console.log(err);
      res.send(err);
    }
  });
  // res.render('index', { title: 'sec' });
});

router.post("/update", function(req, res, next) {
  console.log(req.body.USERName);
  const reqete =
    "UPDATE USER SET   USERName = ? , Role = ? ,password = ? where idUSER = ?";

  mysqlConnect.query(
    reqete,
    [req.body.USERName, req.body.Role, req.body.password, req.body.idUSER],
    (err, resultat) => {
      if (!err) {
        console.log("update");
        res.send('update')
      } else {
        console.log(err);
        res.send(err)

      }
    }
  );
});

router.post("/", function(req, res, next) {
  const requete = "INSERT INTO USER (USERName,password,Role) VALUES (?,?,?)";
  mysqlConnect.query(
    requete,
    [req.body.USERName,req.body.password, req.body.Role],
    (err, resultat, fields) => {
      if (err) {
        console.log(err);
      } else {
        return res.send({ data: resultat.insertId });
      }
    }
  );
  //   res.send("success")
  // res.render('index', { title: valeur });
});
router.post("/delete", function(req, res, next) {
  console.log(req.body.ids);

  mysqlConnect.query(
    "DELETE FROM USER where idUSER = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) res.send("delete");
      else console.log(err);
    }
  );
  //   res.send("success")
  // res.render('index', { title: valeur });
});

module.exports = router;
