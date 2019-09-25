var express = require("express");
var router = express.Router();
let mysqlConnect = require("./connectionDB/db");

/* GET home page. */
router.get("/", function(req, res, next) {
  mysqlConnect.query("SELECT * FROM vache", (err, resultat) => {
    if (!err) {
      return res.json({
        data: resultat
      });
    } else res.send(rows);
  });
  // res.render('index', { title: 'sec' });
});

router.post("/", function(req, res, next) {
  var group = JSON.parse(req.body.group);
  var CowDiet = JSON.parse(req.body.CowDiet);
  if (req.body.DateCow == "") {
    var DateCow = new Date();
  } else {
    var DateCow = req.body.DateCow;
  }
  console.log(DateCow);
  const requete =
    "INSERT INTO vache (name,DateCow,weight,type,CINCOW,note,Father,Mother) VALUES (?,?,?,?,?,?,?,?)";
  mysqlConnect.query(
    requete,
    [
      req.body.name,
      DateCow,
      req.body.weight,
      req.body.type,
      req.body.CINCOW,
      req.body.note,
      req.body.Father,
      req.body.Mother
    ],
    (err, resul, fields) => {
      if (err) {
        console.log(err);

        return res.send({
          err: err
        });
      } else {
        console.log("done");
        if (req.body.choix) {
          for (let j = 0; j < CowDiet.length; j++) {
            const requete =
              "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)";
            mysqlConnect.query(
              requete,
              [
                CowDiet[j].idDiet,
                resul.insertId,
                CowDiet[j].begin,
                CowDiet[j].end
              ],
              (err, resultat, fields) => {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        }
        for (let i = 0; i < group.length; i++) {
          if (group[i].existance) {
            const requete =
              "INSERT INTO Groupe_vaches (idGroupe, idVache ) VALUES (?,?)";
            mysqlConnect.query(
              requete,
              [group[i].idGroupe, resul.insertId],
              (err, resultat, fields) => {
                if (err) {
                  console.log(err);
                } else if (req.body.choix == "false") {
                  console.log("here");
                  if (group[i].DietAffectation != 0) {
                    mysqlConnect.query(
                      "SELECT * FROM Diet_Group WHERE idGroup = " +
                        group[i].idGroupe,
                      (err, resultat) => {
                        if (!err) {
                          for (let j = 0; j < resultat.length; j++) {
                            const requete =
                              "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)";
                            mysqlConnect.query(
                              requete,
                              [
                                resultat[j].idDiet,
                                resul.insertId,
                                resultat[j].begin,
                                resultat[j].end
                              ],
                              (err, resultat, fields) => {
                                if (err) {
                                  console.log(err);
                                }
                              }
                            );
                            console.log("resultat[j].idDiet");
                            console.log(resultat[j].idDiet);
                          }
                          /* return res.json({
                                             data: resultat
                                         })*/
                        } else console.log(err);
                      }
                    );
                  }
                }
              }
            );
          }
        }

        return res.send({ data: resul.insertId });
      }
    }
  );

  //   res.send("success")
  // res.render('index', { title: valeur });
});
router.post("/delete", function(req, res, next) {
  console.log(req.body.ids);

  mysqlConnect.query(
    "DELETE FROM vache where id = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) res.send("delete");
      else console.log(err);
    }
  );
  //   res.send("success")
  // res.render('index', { title: valeur });
});
router.post("/updateCow", function(req, res, next) {
  console.log(req.body.id);
  console.log(req.body.note);
  const reqete = "UPDATE vache SET note = ? where id = ?";

  mysqlConnect.query(reqete, [req.body.note, req.body.id], (err, resultat) => {
    if (!err) console.log("update");
    else console.log(err);
  });

  /*       mysqlConnect.query('DELETE FROM vache where id = ?', [req.body.ids], (err, rows, fields) => {
             if (!err)
                 res.send('delete')
             else
                 console.log(err)
         })*/
  //   res.send("success")
  // res.render('index', { title: valeur });
});

router.post("/Edit", function(req, res, next) {
  var group = JSON.parse(req.body.group);

  console.log("req.body.viewDietCow");
  console.log(req.body.viewDietCow);

  const DateCow = new Date(req.body.DateCow);
  if (req.body.viewDietCow != "false") {
    var idCow = req.body.id;
    var CowDiet = JSON.parse(req.body.CowDiet);

    mysqlConnect.query(
      "DELETE FROM Diet_Cow where idCow = ?",
      [idCow],
      (err, rows, fields) => {
        if (!err) {
          console.log("delete");

          for (let j = 0; j < CowDiet.length; j++) {
            const begin = new Date(CowDiet[j].begin);
            const end = new Date(CowDiet[j].end);

            const requetes =
              "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)";
            mysqlConnect.query(
              requetes,
              [CowDiet[j].idDiet, idCow, begin, end],
              (err, resultat, fields) => {
                if (err) {
                  console.log(err);
                } else console.log(resultat);
              }
            );
          }
        } else console.log(err);
      }
    );
  }
  console.log(req.body.type);
  const requete =
    "UPDATE vache SET name = ? , DateCow = ? ,weight = ? ,type = ? ,CINCOW = ? , note = ? ,Father = ? ,Mother = ? where id = ?";

  mysqlConnect.query(
    requete,
    [
      req.body.name,
      DateCow,
      req.body.weight,
      req.body.type,
      req.body.CINCOW,
      req.body.note,
      req.body.Father,
      req.body.Mother,
      req.body.id
    ],
    (err, resul, fields) => {
      if (err) {
        console.log(err);
      } else {
        const requete = "DELETE FROM Groupe_vaches WHERE idvache = ?";

        mysqlConnect.query(requete, [req.body.id], (err, rows, fields) => {
          if (!err) {
            for (let i = 0; i < group.length; i++) {
              if (group[i].existance) {
                const requete =
                  "INSERT INTO Groupe_vaches (idGroupe, idVache ) VALUES (?,?)";
                mysqlConnect.query(
                  requete,
                  [group[i].idGroupe, req.body.id],
                  (err, resultat, fields) => {
                    if (err) {
                      console.log(err);
                    } else {
                      if (req.body.viewDietCow == "false") {
                        mysqlConnect.query(
                          "DELETE FROM Diet_Cow where idCow = ?",
                          [req.body.id],
                          (err, rows, fields) => {
                            if (!err) console.log("bbbbbbbbbbbbbbbbbbbb");

                            if (group[i].DietAffectationNew != 0) {
                              console.log("heeeeeeeeeeeeeeeeeeeeeeeeey");

                              mysqlConnect.query(
                                "SELECT * FROM Diet_Group WHERE idGroup = " +
                                  group[i].idGroupe,
                                (err, resultat) => {
                                  if (!err) {
                                    for (let j = 0; j < resultat.length; j++) {
                                      const requete =
                                        "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)";
                                      mysqlConnect.query(
                                        requete,
                                        [
                                          resultat[j].idDiet,
                                          req.body.id,
                                          resultat[j].begin,
                                          resultat[j].end
                                        ],
                                        (err, resultat, fields) => {
                                          if (err) {
                                            console.log(err);
                                          }
                                        }
                                      );
                                      console.log("resultat[j].idDiet");
                                      console.log(resultat[j].idDiet);
                                    }
                                  } else res.send(rows);
                                }
                              );
                            } else console.log(err);
                          }
                        );
                      }
                    }
                  }
                );
              }
            }
          } else console.log(err);
        });

        return res.send({ data: resul.insertId });
      }
    }
  );

  //   res.send("success")
  // res.render('index', { title: valeur });
});

router.post("/EditDiet", function(req, res, next) {
  var body = JSON.parse(req.body.post);
  var CowDiet = JSON.parse(body.CowDiet);
  var viewDietCow = JSON.parse(body.viewDietCow);
  var idCow = JSON.parse(body.idCow);
  if (viewDietCow) {
    console.log("aaaaaaaaaaaaaaaaaaaaaaa");
    console.log(idCow);

    mysqlConnect.query(
      "DELETE FROM Diet_Cow where idCow = ?",
      [idCow],
      (err, rows, fields) => {
        if (!err) {
          console.log("delete");

          for (let j = 0; j < CowDiet.length; j++) {
            const begin = new Date(CowDiet[j].begin);
            const end = new Date(CowDiet[j].end);

            const requetes =
              "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)";
            mysqlConnect.query(
              requetes,
              [CowDiet[j].idDiet, idCow, begin, end],
              (err, resultat, fields) => {
                if (err) {
                  console.log(err);
                } else console.log(resultat);
              }
            );
          }
        } else console.log(err);
      }
    );
  }
});

router.delete("/", function(req, res, next) {
  console.log(req.body.ids);

  mysqlConnect.query(
    "DELETE FROM vache where id = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) res.send("delete");
      else console.log(err);
    }
  );
  //   res.send("success")
  // res.render('index', { title: valeur });
});

router.post("/EditCow", function(req, res, next) {
  const DateCow = new Date(req.body.DateCow);

  console.log(DateCow);
  const requete =
    "UPDATE vache SET name = ? , DateCow = ? ,weight = ? ,type = ? ,CINCOW = ?  where id = ?";

  mysqlConnect.query(
    requete,
    [
      req.body.name,
      DateCow,
      req.body.weight,
      req.body.type,
      req.body.CINCOW,

      req.body.id
    ],
    (err, resul, fields) => {
      if (err) {
        res.send(err);
      } else {
        return res.send("update");
      }
    }
  );
});

router.post("/mobile", function(req, res, next) {
  var group = JSON.parse(req.body.group);
  var CowDiet = JSON.parse(req.body.CowDiet);
  var DateCow2 = JSON.parse(req.body.DateCow2);
  var dateCow = DateCow2.DateCow;
  console.log(DateCow2);
  console.log(req.body.DateCow);
  if (dateCow == "") {
    var DateCow = new Date();
  } else {
    var DateCow = new Date(dateCow);
  }
  console.log(DateCow);
  const requete =
    "INSERT INTO vache (name,DateCow,weight,type,CINCOW,note,Father,Mother) VALUES (?,?,?,?,?,?,?,?)";
  mysqlConnect.query(
    requete,
    [
      req.body.name,
      DateCow,
      req.body.weight,
      req.body.type,
      req.body.CINCOW,
      req.body.note,
      req.body.Father,
      req.body.Mother
    ],
    (err, resul, fields) => {
      if (err) {
        console.log(err);

        return res.send({
          err: err
        });
      } else {
        console.log("done");

        return res.send({ data: resul.insertId });
      }
    }
  );

  //   res.send("success")
  // res.render('index', { title: valeur });
});

module.exports = router;
