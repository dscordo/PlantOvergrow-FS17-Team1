var createError = require('http-errors');
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var authRouter = require('./routes/auth');
var plantInfoRouter = require('./routes/plantinfo');
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var plantinfoRouter = require("./routes/plantinfo");
var wishlistRouter = require("./routes/wishlist");
var externalApi = require('./routes/externalApi');

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use('/', authRouter); 
app.use('/plantinfo', plantInfoRouter); 
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/plantinfo", plantinfoRouter);
app.use("/wishlist", wishlistRouter);
app.use("/externalApi", externalApi);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

module.exports = app;
