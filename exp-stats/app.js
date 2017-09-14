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
      // '/usr/src/app/node_modules/players.db'
      './node_modules/players.db'
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

    const processTeamDataFile = teamId => (err, data) => {
      if (err) {
        throw err;
      }

      const teamDetails = JSON.parse(data);

      db.insert(teamDetails, (err, results) => {
        if (err) {
          console.log("err", err);
          return;
        }

        const teamInfo = results;

        teamInfo.players.forEach(player => {
          console.log(teamId + " player", player); 
        });
      });    
    };

    const processTeam3File = processTeamDataFile("t3");
    const processTeam5File = processTeamDataFile("t5");

    fs.readFile('./team3.json', 'utf8', processTeam3File);
    fs.readFile('./team5.json', 'utf8', processTeam5File);
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

// app.use('/', express.static(path.join(__dirname, 'public')));
// app.use('/teams', express.static(path.join(__dirname, 'public')));
// app.use('/app/teams', express.static(path.join(__dirname, 'public')));

const getIndexFile = (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
};

// app.use('/', (req, res) => {
//   // res.sendFile(__dirname + '/public/index.html');
//   res.redirect('/app/teams/');
// });

app.use('/app/teams', getIndexFile);
app.use('/app/team3*', getIndexFile);
app.use('/app/team5', getIndexFile);

const getDistFile = (req, res) => {
  // var urlpath = path.join(__dirname, 'public/css/' + req.originalUrl);
  var urlpath = path.join(__dirname, 'public/' + req.originalUrl);
  console.log(urlpath);
  res.sendFile(urlpath);
};

app.use('/index-*', getDistFile);
app.use('/vendor-*', getDistFile);
app.use('/app-*', getDistFile);

// app.use('/app/', function(req, res){
//   console.error("/app/ handling app sub path");

//   res.sendFile(__dirname + '/public/index.html');
// });

// app.use('/*', function(req, res){
//   console.error("/app/* handling app sub path");

//   res.sendFile(__dirname + '/public/index.html');
// });

// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/', (req, res) => {
//   console.error("redirect to app");

//   res.redirect('/app');
// });

// app.use('/', function(req, res){
//   console.error("/ handling no path");

//   res.sendFile(__dirname + '/public/index.html');
// });

// app.use('/users', users);
app.use('/players', players);
app.use('/teams', teams);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;

  console.log("not found");
  console.error("not found");
 
  // console.log("not found", err);
  // console.error("not found", err);
 
  // next(err);


  // getIndexFile(req, res);
  res.redirect('/app/teams');
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
