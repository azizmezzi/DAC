var express = require("express");
var router = express.Router();
let mysqlConnect = require("./connectionDB/db");

/* GET home page. */
router.get("/", function(req, res, next) {
  mysqlConnect.query("SELECT * FROM DAC", (err, resultat) => {
    if (!err) {
      return res.json({
        data: resultat
      });
    } else res.send(rows);
  });
  // res.render('index', { title: 'sec' });
});
router.post("/", function(req, res, next) {
  const requete = "INSERT INTO DAC (DACName,Quantity,DACstate) VALUES (?,?,?)";
  mysqlConnect.query(
    requete,
    [req.body.DACName, req.body.Quantity, req.body.DACstate],
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
router.post("/update", function(req, res, next) {
  console.log(req.body.DACName);

  console.log(parseInt(req.body.tube1));

  console.log(parseInt(req.body.tube2));
  console.log(parseInt(req.body.tube3));
  const reqete =
    "UPDATE DAC SET   DACName = ? ,Quantity = ?,DACstate = ? where idDAC = ?";

  mysqlConnect.query(
    reqete,
    [req.body.DACName, req.body.Quantity, req.body.DACstate, req.body.idDAC],
    (err, resultat) => {
      if (!err) {
        res.send("update");
        console.log("update");
        mysqlConnect.query(
          "DELETE FROM Fooder_DAC where idDAC = ?",
          [req.body.idDAC],
          (err, rows, fields) => {
            if (!err) {
              console.log("delete");
              if (parseInt(req.body.tube1) != 0) {
                const requete1 =
                  "INSERT INTO Fooder_DAC (idFodder,idDAC ,tubeNumber) VALUES (?,?,?)";
                mysqlConnect.query(
                  requete1,
                  [parseInt(req.body.tube1), req.body.idDAC, 1],
                  (err, resultat, fields) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              }
              if (parseInt(req.body.tube2) != 0) {
                const requete2 =
                  "INSERT INTO Fooder_DAC (idFodder,idDAC,tubeNumber) VALUES (?,?,?)";
                mysqlConnect.query(
                  requete2,
                  [parseInt(req.body.tube2), req.body.idDAC, 2],
                  (err, resultat, fields) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              }
              if (parseInt(req.body.tube3) != 0) {
                const requete3 =
                  "INSERT INTO Fooder_DAC (idFodder,idDAC,tubeNumber) VALUES (?,?,?)";
                mysqlConnect.query(
                  requete3,
                  [parseInt(req.body.tube3), req.body.idDAC, 3],
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
      } else console.log(err);
    }
  );
});

router.post("/delete", function(req, res, next) {
  console.log(req.body.ids);

  mysqlConnect.query(
    "DELETE FROM DAC where idDAC = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) res.send("delete");
      else console.log(err);
    }
  );
  //   res.send("success")
  // res.render('index', { title: valeur });
});

router.post("/updateTube", function(req, res, next) {
  console.log("req.body.tube1")
  console.log(req.body.tube1)

  if (parseInt(req.body.tube1) != 0) {
    const requete1 =
      "UPDATE Fooder_DAC SET  idFodder = ? where  idDAC = ? and tubeNumber = ? ";
    mysqlConnect.query(
      requete1,
      [parseInt(req.body.tube1), parseInt(req.body.idDAC), 1],
      (err, resultat, fields) => {
        if (err) {
          console.log(err);
        } else res.send("update");
      }
    );
  }

  if (parseInt(req.body.tube2) != 0) {
    console.log("req.body.tube2")
    console.log(req.body.tube2)
    const requete2 =
      "UPDATE Fooder_DAC SET  idFodder = ? where  idDAC = ? and tubeNumber = ? ";
    mysqlConnect.query(
      requete2,
      [parseInt(req.body.tube2), parseInt(req.body.idDAC), 2],
      (err, resultat, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log("req.body.tube2")
          console.log(req.body.tube2)
          res.send("update");}
      }
    );
  }
  if (parseInt(req.body.tube3) != 0) {
    const requete3 =
      "UPDATE Fooder_DAC SET  idFodder = ? where  idDAC = ? and tubeNumber = ? ";
    mysqlConnect.query(
      requete3,
      [parseInt(req.body.tube3), parseInt(req.body.idDAC), 3],
      (err, resultat, fields) => {
        if (err) {
          console.log(err);
        } else res.send("update");
      }
    );
  }
});

module.exports = router;
