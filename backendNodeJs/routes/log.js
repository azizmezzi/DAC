var express = require("express");
var router = express.Router();
let mysqlConnect = require("./connectionDB/db");

/* GET home page. */
router.get("/", function(req, res, next) {
  mysqlConnect.query("SELECT * FROM log", (err, resultat) => {
    if (!err) {
      return res.json({
        data: resultat
      });
    } else res.send(err);
  });
  // res.render('index', { title: 'sec' });
});

router.post("/", function(req, res, next) {
  var idDAC = parseInt(req.body.idDAC);
  var date = req.body.date;
  data = [
    /*500,
    800,
    320,
    180,
    240,
    320,
    230,
    650,*/
    590,
    1200,
    750,
    940,
    1420,
    1200,
    960,
    1450,
    1820,
    2800,
    2102,
    1920,
    3920,
    3202,
    3140,
    2800,
    3200,
    3200,
    3400,
    /*2910,
    3100,
    4250*/
  ];

  for (let i = 0; i < data.length; i += 1) {
    const DateDAC = new Date("2019-05-12");
    const requete =
      "INSERT INTO log (idFodder,idCow,idDAC ,QtManager , date ) VALUES (? ,? ,? ,?, ?)";
    mysqlConnect.query(
      requete,
      [ 90 ,218, 47, data[i], DateDAC],
      (err, resultat, fields) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
});

router.post("/stat", function(req, res, next) {
  var body = JSON.parse(req.body.post);
  var idDAC = JSON.parse(body.idDAC);
  var idCow = JSON.parse(body.idCow);
  var startDate = JSON.parse(body.startDate);
  var endDate = JSON.parse(body.endDate);

  if (idDAC === 0 && (idCow === 0) & (startDate === "") && endDate === "") {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log GROUP BY date ",
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC !== 0 &&
    (idCow === 0) & (startDate === "") &&
    endDate === ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? GROUP BY date ",
      [idDAC],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log("aa");
            console.log(resultat[i].date.substr(0,10));

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC === 0 &&
    (idCow !== 0) & (startDate === "") &&
    endDate === ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idCow = ? GROUP BY date ",
      [idCow],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC === 0 &&
    (idCow === 0) & (startDate !== "") &&
    endDate === ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where date > ? GROUP BY date ",
      [startDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);
            

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC === 0 &&
    (idCow === 0) & (startDate === "") &&
    endDate !== ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where date < ? GROUP BY date ",
      [endDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC !== 0 &&
    (idCow !== 0) & (startDate === "") &&
    endDate === ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? and idCow = ? GROUP BY date ",
      [idDAC, idCow],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC !== 0 &&
    (idCow === 0) & (startDate !== "") &&
    endDate === ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? and date > ? GROUP BY date ",
      [idDAC, startDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        }else console.log(err);
      }
    );
  } else if (
    idDAC !== 0 &&
    (idCow === 0) & (startDate === "") &&
    endDate !== ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? and date < ? GROUP BY date",
      [idDAC, endDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC === 0 &&
    (idCow !== 0) & (startDate !== "") &&
    endDate === ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idCow = ? and date > ? GROUP BY date",
      [idCow, startDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC === 0 &&
    (idCow !== 0) & (startDate === "") &&
    endDate !== ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idCow = ? and date < ? GROUP BY date",
      [idCow, endDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC === 0 &&
    (idCow === 0) & (startDate !== "") &&
    endDate !== ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? and date > ? and date < ? GROUP BY date",
      [startDate, endDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        }else console.log(err);
      }
    );
  } else if (
    idDAC !== 0 &&
    (idCow === 0) & (startDate !== "") &&
    endDate !== ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? and date > ? and date < ? GROUP BY date",
      [idDAC, startDate, endDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC !== 0 &&
    (idCow !== 0) & (startDate === "") &&
    endDate !== ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? and idCow = ? and date < ? GROUP BY date",
      [idDAC, idCow, endDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC !== 0 &&
    (idCow !== 0) & (startDate !== "") &&
    endDate === ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? and idCow = ? and date > ? GROUP BY date",
      [idDAC, idCow, startDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC === 0 &&
    (idCow !== 0) & (startDate !== "") &&
    endDate !== ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idCow = ? and date > ? and date < ? GROUP BY date",
      [idCow, startDate, endDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  } else if (
    idDAC !== 0 &&
    (idCow !== 0) & (startDate !== "") &&
    endDate !== ""
  ) {
    mysqlConnect.query(
      "SELECT date , SUM(QtManager) as sumQt FROM log where idDac = ? and idCow = ? and date > ? and date < ? GROUP BY date",
      [idDAC, idCow, startDate, endDate],
      (err, resultat) => {
        if (!err) {
          const data = [];
          for (let i = 0; i < resultat.length; i += 1) {
            const v = resultat[i];
            console.log(v.sumQt);

            data.push([resultat[i].date.substr(0,10), v.sumQt]);
          }
          console.log(data);
          return res.json({
            data
          });
        } else console.log(err);
      }
    );
  }
});

router.post("/delete", function(req, res, next) {
  console.log(req.body.ids);

  mysqlConnect.query(
    "DELETE FROM log where idlog = ?",
    [req.body.ids],
    (err, rows, fields) => {
      if (!err) res.send("delete");
      else console.log(err);
    }
  );
});
router.post("/update", function(req, res, next) {
  const date = new Date(req.body.date);
  console.log(req.body.log);
  const reqete = "UPDATE log SET   idDAC= ? , date=? where idlog = ?";
  mysqlConnect.query(
    reqete,
    [parseInt(req.body.idDAC), date, req.body.idlog],
    (err, resultat) => {
      if (!err) console.log("update");
      else console.log(err);
    }
  );
});
module.exports = router;
