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
var users = require('./routes/service/authenticate');
var TokenHandler = require(__BASE__ + "modules/controller/handler/TokenHandler");
var LOGGER = require(__BASE__ + "modules/utils/Logger");


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



app.use('/bower', express.static(path.join(__dirname, 'bower_components')));


/****************************************************/
/*************** Database Connection ****************/
/****************************************************/

// Make our db accessible to our router
var dbUrl = CONFIG.DATABASE_URL;
mongoose.connect('mongodb://' + dbUrl, function(err) {
    if (err) {
        LOGGER.log.error(LOGGER.PREFIX.DATABASE + 'Database connection failed', err);
    } else {
        LOGGER.log.debug(LOGGER.PREFIX.DATABASE + 'Database connection successful');
    }
});

mongoose.set('debug', true);

/****************************************************/
/******************* Routes Setup *******************/
/****************************************************/
var UI_INDEX = require(__BASE__ + "routes/index");
var SERVICE_authenticate = require(__BASE__ + "routes/service/authenticate");
var SERVICE_achievements = require(__BASE__ + "routes/service/achievements");
var SERVICE_event = require (__BASE__ + "routes/service/event");
var SERVICE_news = require(__BASE__  + "routes/service/news");
var SERVICE_batch = require(__BASE__ + "routes/service/batch");
var SERVICE_faculty = require(__BASE__ + "routes/service/faculty");


/****************************************************/
/****************** Routes Mapping ******************/
/****************************************************/
app.use('/', UI_INDEX);
app.use('/service/authenticate', SERVICE_authenticate);
app.use('/achievement',SERVICE_achievements);
app.use('/service/posts',SERVICE_event);
app.use('/service/news',SERVICE_news);
app.use('/service/batch',SERVICE_batch);
app.use('/service/faculty',SERVICE_faculty);



/****************************************************/
/***************** Redis Connection *****************/
/****************************************************/
var client = TokenHandler.client;







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
