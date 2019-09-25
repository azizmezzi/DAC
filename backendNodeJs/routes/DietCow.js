var express = require("express");
var router = express.Router();
let mysqlConnect = require("./connectionDB/db");
compareDiets2 = (CowDiet, GroupDiet, idCow) => {
  var temp = [];
  var array1 = [];
  var array2 = [];
  for (let i = 0; i < GroupDiet.length; i++) {
    var begin = new Date(GroupDiet[i].begin);
    var end = new Date(GroupDiet[i].end);
    var begin1 = "" + begin.getDate() + begin.getDay() + begin.getFullYear();
    var end1 = "" + end.getDate() + end.getDay() + end.getFullYear();
    var str = GroupDiet[i].idDiet + begin1 + end1 + "";
    array1.push(str);
  }

  for (let i = 0; i < CowDiet.length; i++) {
    var begin2 = new Date(CowDiet[i].begin);
    var end2 = new Date(CowDiet[i].end);
    var begin3 = "" + begin2.getDate() + begin2.getDay() + begin2.getFullYear();
    var end3 = "" + end2.getDate() + end2.getDay() + end2.getFullYear();
    var str2 = CowDiet[i].idDiet + begin3 + end3 + "";

    array2.push(str2);
  }

  for (var i in array1) {
    if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
  }
  for (i in array2) {
    if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
  }

  if (temp.length == 0) {
    var result = true;
  } else var result = false;

  return { id: idCow, result };
};
compareDiets = (CowDiet, GroupDiet) => {
  var temp = [];
  var array1 = [];
  var array2 = [];
  for (let i = 0; i < GroupDiet.length; i++) {
    var begin = new Date(GroupDiet[i].begin);
    var end = new Date(GroupDiet[i].end);
    var begin1 = "" + begin.getDate() + begin.getDay() + begin.getFullYear();
    var end1 = "" + end.getDate() + end.getDay() + end.getFullYear();
    var str = GroupDiet[i].idDiet + begin1 + end1 + "";
    array1.push(str);
  }

  for (let i = 0; i < CowDiet.length; i++) {
    var begin2 = new Date(CowDiet[i].begin);
    var end2 = new Date(CowDiet[i].end);
    var begin3 = "" + begin2.getDate() + begin2.getDay() + begin2.getFullYear();
    var end3 = "" + end2.getDate() + end2.getDay() + end2.getFullYear();
    var str2 = CowDiet[i].idDiet + begin3 + end3 + "";

    array2.push(str2);
  }

  for (var i in array1) {
    if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
  }
  for (i in array2) {
    if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
  }

  if (temp.length == 0) {
    var result = true;
  } else var result = false;

  return result;
};
router.get("/", function(req, res, next) {
  console.log(req.query.idCow);
  mysqlConnect.query(
    "SELECT * FROM Diet_Cow WHERE idCow = " + req.query.idCow,
    (err, resultat) => {
      if (!err) {
        console.log(resultat);
        return res.json({
          data: resultat
        });
      } else console.log(err);
    }
  );
});
router.get("/All", function(req, res, next) {
  console.log("resultat");

  mysqlConnect.query("SELECT * FROM Diet_Cow", (err, resultat) => {
    if (!err) {
      console.log(resultat);
      return res.json({
        data: resultat
      });
    } else console.log(err);
  });
});
router.get("/Compare", function(req, res, next) {
  var body = JSON.parse(req.query.post);
  var GroupDiet = JSON.parse(body.GroupDiet);
  var vacheFiltred = JSON.parse(body.vacheFiltred);
  var ResultatFinal = [];
  var ResultatFinal2 = [];
  for (let i = 0; i < vacheFiltred.length; i++) {
    mysqlConnect.query(
      "SELECT * FROM Diet_Cow WHERE idCow = " + vacheFiltred[i],
      (err, resultat) => {
        if (!err) {
          ResultatFinal.push(this.compareDiets(resultat, GroupDiet));
          ResultatFinal2.push(
            this.compareDiets2(resultat, GroupDiet, vacheFiltred[i])
          );
          if (i + 1 == vacheFiltred.length) {
            console.log("ResultatFinal");
            console.log(ResultatFinal);
            console.log("ResultatFinal2");
            console.log(ResultatFinal2);
            return res.json({
              data: ResultatFinal
            });
          }
        } else console.log(err);
      }
    );
  }
});

router.get("/Compare2", function(req, res, next) {
  console.log("aaaaaaaaaaaa");

  var body = JSON.parse(req.query.post);
  var vacheDiet = JSON.parse(body.vacheDiet);
  var groupeId = JSON.parse(body.groupeId);
  console.log(vacheDiet);
  console.log(groupeId);

  var ResultatFinal = [];
  if (vacheDiet.length == 0 && groupeId == 0) {
    return res.json({
      data: ResultatFinal
    });
  } else {
    for (let i = 0; i < groupeId.length; i++) {
      mysqlConnect.query(
        "SELECT * FROM Diet_Group WHERE idGroup = " + groupeId[i],
        (err, resultat) => {
          if (!err) {
            console.log("***********************************");
            console.log(resultat);
            console.log(vacheDiet);
            console.log("***********************************");
            ResultatFinal.push({
              idGroupe: groupeId[i],
              result: this.compareDiets(resultat, vacheDiet)
            });
            if (i + 1 == groupeId.length) {
              console.log(ResultatFinal);
              console.log("ResultatFinal");
              return res.json({
                data: ResultatFinal
              });
            }
          } else console.log(err);
        }
      );
    }
  }
});
router.post("/", function(req, res, next) {
  var idDiet = req.body.idDiet;
  var idCow = req.body.idCow;
  var begin = req.body.begin;
  var end = req.body.end;
  console.log(idCow);
  const requete =
    "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)";
  mysqlConnect.query(
    requete,
    [idDiet, idCow, begin, end],
    (err, resultat, fields) => {
      if (err) {
        console.log(err);
      } else return res.send("done");
    }
  );
});
router.post("/Create", function(req, res, next) {
  var body = JSON.parse(req.body.post);
  var vachesState = JSON.parse(body.vachesState);
  var GroupDiet = JSON.parse(body.GroupDiet);
  console.log("****1111111111******");

  console.log(GroupDiet);
  console.log("**********************");

  console.log(vachesState);
  for (let i = 0; i < vachesState.length; i++) {
    if (vachesState[i].DietAffectation) {
      mysqlConnect.query(
        "DELETE FROM Diet_Cow where idCow = ?",
        [vachesState[i].id],
        (err, rows, fields) => {
          if (!err) {
            console.log("delete");
          } else console.log(err);
        }
      );
      for (let j = 0; j < GroupDiet.length; j++) {
        const begin = new Date(GroupDiet[j].begin);
        const end = new Date(GroupDiet[j].end);
        const requete =
          "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)";
        mysqlConnect.query(
          requete,
          [
            parseInt(GroupDiet[j].idDiet),
            vachesState[i].id,
            GroupDiet[j].DateDebut,
            GroupDiet[j].DateFin
          ],
          (err, resultat, fields) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
  }
  return res.send("done");

  /*  var idDiet = req.body.idDiet
      var idCow = req.body.idCow
      var begin = req.body.begin
      var end = req.body.end
      console.log(idCow)
      const requete = "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)"
      mysqlConnect.query(requete, [idDiet, idCow, begin, end], (err, resultat, fields) => {
          if (err) {
              console.log(err)
          }
      });
  */
});
router.post("/delete", function(req, res, next) {
  console.log("delete");
  console.log(req.body.ids);

  mysqlConnect.query(
    "DELETE FROM Diet_Cow where idProgram = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) {
        console.log("delete");
        return res.send("done");
      } else console.log(err);
    }
  );
});
router.post("/update", function(req, res, next) {
  var idProgram = req.body.idProgram;
  var idDiet = req.body.idDiet;
  var idCow = req.body.idCow;

  var begin = new Date(req.body.begin);
  var end = new Date(req.body.end);

  console.log("*********");
  console.log(idProgram);
  console.log(idDiet);
  console.log(idCow);
  console.log(begin);
  console.log(end);
  const reqete =
    "UPDATE Diet_Cow     SET idDiet = ? ,  idCow = ? ,  begin = ?,  end = ? where idProgram = ?";

  mysqlConnect.query(
    reqete,
    [idDiet, idCow, begin, end, idProgram],
    (err, resultat) => {
      if (!err) {
        console.log("update");
        return res.send("done");
      } else console.log(err);
    }
  );
});

router.post("/Edit", function(req, res, next) {
  var body = JSON.parse(req.body.post);
  var DietCowEdited = JSON.parse(body.DietCowEdited);
  var GroupDiet = JSON.parse(body.GroupDiet);
  console.log("DietCowEdited");
  console.log(DietCowEdited);
  console.log("GroupDiet");
  console.log(GroupDiet);

  for (let j = 0; j < DietCowEdited.length; j++) {
    mysqlConnect.query(
      "DELETE FROM Diet_Cow where idCow = ?",
      [DietCowEdited[j]],
      (err, rows, fields) => {
        if (!err) {
          console.log("delete");
          for (let i = 0; i < DietCowEdited.length; i++) {
            for (let j = 0; j < GroupDiet.length; j++) {
              const begin = new Date(GroupDiet[j].begin);
              const end = new Date(GroupDiet[j].end);
              const requete =
                "INSERT INTO Diet_Cow (idDiet, idCow, begin  ,end) VALUES (?,?,?,?)";
              mysqlConnect.query(
                requete,
                [
                  parseInt(GroupDiet[j].idDiet),
                  parseInt(DietCowEdited[i]),
                  begin,
                  end
                ],
                (err, resultat, fields) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          }
          return res.send("done");
        } else console.log(err);
      }
    );
  }
});
module.exports = router;
