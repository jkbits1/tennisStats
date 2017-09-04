/**
 * Created by jk on 12/08/17
 */

const fs = require('fs');

const casper = require('casper').create({
    verbose: true,
    logLevel: 'warning',
    waitTimeout: 5000
});

// barnet 5
// const teamUrl = 'http://lta.tournamentsoftware.com/sport/teamplayerstats.aspx?id=AE26B6DB-ED63-4277-B089-ADFF66DB4ECA&team=119';

// barnet 3
const teamUrl = 'http://lta.tournamentsoftware.com/sport/teamplayerstats.aspx?id=AE26B6DB-ED63-4277-B089-ADFF66DB4ECA&team=116';

const playerRowSelector   = 'table.ruler tr';
const playerCellSelector  = 'table.ruler tr td';

const playerColumnCount = 6;

// const playerFileName = 'players.txt';
const playerFileName = 'players3.txt';

var searchResultPlayers = [];
var players = [];

casper.start(
    teamUrl    
  , function() {
      // a couple of quick sanity checks
      if (this.exists('div#header')) {
          this.echo('header div exists');
      }

      if (this.exists('table.ruler')) {
          this.echo('table exists');
      }  
  });

function displaySelectorUpdate (that, selectorName) {
  if (that.exists(selectorName)) {
    that.echo('the ' + selectorName + ' exists');
  }
  else {
    that.echo(selectorName + ' not found');
  }
}

function getSearchedPlayerResults() {
  var searchResultPersons = 
    document.querySelectorAll('table.ruler tr td');

  return Array.prototype.map.call(searchResultPersons, function (e) {
    return e.innerText;
  });
}

casper.waitFor(
  function check() {
    return this.evaluate(function () {
      return document.querySelectorAll('table.ruler tr').length > 0;
    });
  },
  function then() {
    console.log("rows exist");

    displaySelectorUpdate (this, playerRowSelector);

    searchResultPlayers = 
      this.evaluate(getSearchedPlayerResults);

    var currentPlayerCol = 0;
    var currentPlayer = {};

    searchResultPlayers.forEach(function (playerInfo, idx) {
      var resultInfoItems = [];

      switch (currentPlayerCol) {
        case 0:
          currentPlayer.Rank = playerInfo;
          break;
        case 1:
          currentPlayer.Name = playerInfo;
          break;
        case 2:
          currentPlayer.Won = playerInfo;
          break;
        case 3:
          currentPlayer.Played = playerInfo;
          break;
        case 4:
          currentPlayer.Sets = playerInfo;
          break;
        case 5:
          currentPlayer.Games = playerInfo;
          break;
      }

      currentPlayerCol++;
      if (currentPlayerCol > (playerColumnCount - 1)) {
        players.push(currentPlayer);

        currentPlayer = {};
        currentPlayerCol = 0;
      }
    });

    players.forEach(function (player) {
      console.log("stored player info", JSON.stringify(player));
      // for (item in player) {
      //   console.log("item", item);
      //   console.log("value", player[item]);
        
      // }
    });
  }
);

casper.run(function() {
  fs.write(playerFileName, JSON.stringify(players));
  this.exit();
});
