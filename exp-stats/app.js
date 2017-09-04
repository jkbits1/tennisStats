var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
// var users = require('./routes/users');
var playersRouter = require('./routes/players');
var teamsRouter = require('./routes/teams');
var players = playersRouter.router;
var teams = teamsRouter.router;

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
  teamsRouter.setDb(db);

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

      const teamFiveDetails = {
        team: '5',
        players: playerDetails
      }
      // const playerPromises = [];

      db.insert(teamFiveDetails, (err, results) => {
        if (err) {
          console.log("err", err);
          return;
        }

        const teamInfo = results;

        teamInfo.players.forEach(player => {
          console.log("t5 player", player); 
        });
      });    
    });

    fs.readFile('./team3.json', 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      // console.log("team data", data);

      const teamDetails = JSON.parse(data);

      console.log("team details", teamDetails);

      db.insert(teamDetails, (err, results) => {
        if (err) {
          console.log("err", err);
          return;
        }

        // console.log("inserted", results); 

        const teamInfo = results;

        teamInfo.players.forEach(player => {
          console.log("t3 player", player); 
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
app.use('/teams', teams);

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
    console.log("found players");
    // res.send(players);
    // res.jsonp(players);
    res.json(players);
  });

});


module.exports = app;
