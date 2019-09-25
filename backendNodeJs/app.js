var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var UserRouter = require("./routes/User");
var vacheRouter = require("./routes/vache");
var groupRouter = require("./routes/groupe");
var FooderRouter = require("./routes/fooder");
var DietRouter = require("./routes/Diet");
var FooderDiet = require("./routes/FooderDiet");
var GroupeVache = require("./routes/GroupeVache");
var DietCow = require("./routes/DietCow");
var DietGroup = require("./routes/DietGroup");
var GroupEdit = require("./routes/GroupEdit");
var DACRouter = require("./routes/DAC");
var FooderDAC = require("./routes/FooderDAC");
var Notification = require("./routes/notification");
var Log = require("./routes/log");
var Statistique = require("./routes/statistique");

var app = express();

// view engine setup
/*app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");*/
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "build")));

app.get("/app", (req, res, err) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/vaches", vacheRouter);
app.use("/DAC", DACRouter);
app.use("/groupe", groupRouter);
app.use("/Diet", DietRouter);
app.use("/fooder", FooderRouter);
app.use("/FooderDiet", FooderDiet);
app.use("/GroupCow", GroupeVache);
app.use("/DietCow", DietCow);
app.use("/DietGroup", DietGroup);
app.use("/GroupEdit", GroupEdit);
app.use("/User", UserRouter);
app.use("/FooderDAC", FooderDAC);
app.use("/Notification", Notification);
app.use("/Log", Log);
app.use("/Statistique", Statistique);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
