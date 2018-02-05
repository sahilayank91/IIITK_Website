global.__BASE__ = __dirname + '/';

var CONFIG = require(__BASE__ + "config/databaseConfig");
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/services/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');

//TODO the favicon is not working , make it work.
//  app.use(favicon(path.join(__dirname, '/images/', 'IIIT-_Kota_Logo.png')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', users);

app.use('/bower', express.static(path.join(__dirname, 'bower_components')));


/****************************************************/
/*************** Database Connection ****************/
/****************************************************/

// Make our db accessible to our router
var dbUrl = CONFIG.DATABASE_URL;
mongoose.connect('mongodb://' + dbUrl, function(err) {
    if (err) {
        console.log("Database connection failed");
      } else {
        console.log(dbUrl);
        console.log("Database connection successful");
    }
});



/****************************************************/
/******************* Routes Setup *******************/
/****************************************************/
var UI_INDEX = require(__BASE__ + "routes/index");
var USERS = require(__BASE__ + "routes/services/users");
var ACHIEVEMENTS = require(__BASE__ + "routes/services/achievements");
var POSTS = require (__BASE__ + "routes/services/posts");
var NEWS = require(__BASE__  + "routes/services/news");
var STUDENTS = require(__BASE__ + "routes/services/students");









/****************************************************/
/****************** Routes Mapping ******************/
/****************************************************/
app.use('/', UI_INDEX);
app.use('/users',USERS);
app.use('/achievement',ACHIEVEMENTS);
app.use('/posts',POSTS);
app.use('/news',NEWS);
app.use('/students',STUDENTS);







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
