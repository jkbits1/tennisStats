var express = require('express');
var router = express.Router();

var db = undefined;

// GET teams
router.get('/:id', function(req, res, next) {

  const teamId = req.params.id;

  console.log("team id", teamId);

  if (db === undefined || db === null) {
    res.send('no db');

    return;
  }
  
  db.find({ team: teamId.toString() }, (err, teams) => {
    if (err) {
      res.send('db error');

      throw err;
    }

    if (teams.length === 0) {
      res.send("no info found");
    }

    console.log("teams", teams);

    const team = teams[0];

    console.log("returning players", team);

    team.players.forEach(player => {
      console.log("player from db", player);
    });

    // res.send(players);
    res.jsonp(team.players);
  });

});

module.exports = {
  router: router,
  setDb: function (newDb) {
    db = newDb;
  }
};
