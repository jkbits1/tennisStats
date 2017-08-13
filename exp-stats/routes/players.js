var express = require('express');
var router = express.Router();

// const Datastore = require('nedb');

// const db = new Datastore({
//     filename:
//       '/usr/src/app/node_modules/players.db'
//   , autoload: true
// });

var db = undefined;

// db.loadDatabase(err => {
//   if (err) {
//     console.log("players db err");

//     throw err;
//   }
// });

// GET players
router.get('/', function(req, res, next) {

  if (db === undefined || db === null) {
    res.send('no db');

    return;
  }
  
  db.find({}, (err, players) => {
    if (err) {
      res.send('db error');

      throw err;
    }

    res.send(players);
  });

});

module.exports = {
  router: router,
  setDb: function (newDb) {
    db = newDb;
  }
};
