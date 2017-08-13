var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
// var users = require('./routes/users');
var playersRouter = require('./routes/players');
var players = playersRouter.router;

const fs = require('fs');
const Datastore = require('nedb');

const db = new Datastore({
    filename:
      // path.join('examples', 'step', 'data', 'players.db')
      '/usr/src/app/node_modules/players.db'
  , autoload: true
});

db.loadDatabase(err => {
  if (err) {
    console.log("app - players db err");

    throw err;
  }

  playersRouter.setDb(db);

  db.remove({}, {multi: true}, (err, removeCount) => {
    if (err) {
      throw err;
    }

    console.log("remove count", removeCount);

    fs.readFile('./players.txt', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      // console.log("data", data);

      const playerDetails = JSON.parse(data);
      // const playerPromises = [];

      db.insert(playerDetails, (err, results) => {
        results.forEach( result => {
          // console.log("inserted", result); 
        });
      });    
    });
  });


});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/players', players);

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

app.get('/players', (req, res) => {

  db.find({}, (err, players) => {
    res.send(players);
  });

});


module.exports = app;
