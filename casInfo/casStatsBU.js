/**
 * Created by jk on 29/07/15.
 */

var links = [];

var argName = true;
var argJobTitle = false;
var argCompany = false;
var argLocation = false;

var argVerbose = false;

var searchTarget = "";
var searchJobTitle = "";
var searchCompany = "";
var searchLocation = "";

var searchResults = [];
var searchTitles = [];
var searchDescriptions = [];

var backgroundTitles = [];

var titles = [];
var casper = require('casper').create({
    verbose: true,
    logLevel: 'warning',
    waitTimeout: 5000
});

var resultsCount = [];
var searchResultsCount = 0;

var searchResultPersons = [];
var searchResultPersonsIndexMatch = -1;
var searchResultPersonsIndexOffset = 1;

var maxArgs = 20;

var fs = require('fs');

// casper.echo(casper.cli.has(0));
// casper.echo(casper.cli.get(0));
// casper.echo(casper.cli.has(1));
// casper.echo(casper.cli.get(1));
// casper.echo(casper.cli.has(2));
// casper.echo(casper.cli.get(2));
// casper.echo(casper.cli.has(3));
// casper.echo(casper.cli.get(3));

// casper.echo(casper.cli.get(0) + ' ' + casper.cli.get(1));


//casper.echo(casper.cli.has("foo"));
//casper.echo(casper.cli.get("foo"));
//casper.cli.drop("foo");
//casper.echo(casper.cli.has("foo"));
//casper.echo(casper.cli.get("foo"));



//casper.echo(casper.cli.has(1));
//casper.echo(casper.cli.get(1));


//casper.echo("global args", casper.cli.args);

//searchTarget += casper.cli.args.join(' ');

//casper.echo("args:", casper.cli.args);
//casper.echo("args len:", casper.cli.args.length);



casper.echo("target:", searchTarget);
casper.echo("target job:", searchJobTitle);
casper.echo("target co:", searchCompany);

function displaySelectorUpdate (that, selectorName) {
  if (that.exists(selectorName)) {
    that.echo('the ' + selectorName + ' exists');
  }
  else {
    that.echo(selectorName + ' not found');
  }
}

function getLinks() {
  //var links = document.querySelectorAll('h3.r a');
  var links = document.querySelectorAll('a.headline');
  return Array.prototype.map.call(links, function(e) {
    //return e.getAttribute('href');
    //return e.text('href');
    return e.text;
  });
}

function getSearchedPersonLinks() {
  var searchResults = document.querySelectorAll('.bd .highlight');
  return Array.prototype.map.call(searchResults, function(e) {
    //return e.getAttribute('href');
    //return e.text('href');

    return e.innerHTML;
  });
}

function getSearchedPersonTitles() {
  var searchTitles = document.querySelectorAll('.abstract-trunc');
  return Array.prototype.map.call(searchTitles, function(e) {
    //return e.getAttribute('href');
    //return e.text('href');

    return e.innerHTML;
  });
}

function getSearchedPersonDescriptions() {
  var searchDescriptions = document.querySelectorAll('.bd .description');

  return Array.prototype.map.call(searchDescriptions, function(e) {
    //return e.getAttribute('href');
    //return e.text('href');

    //return e.innerHTML;
    return e.innerText;
  });
}

function getSearchedPersonResultsCount() {
  var resultsCount = document.querySelectorAll('#results_count p');

  return Array.prototype.map.call(resultsCount, function(e) {
    return e.innerText;
  });
}

function getSearchedPersonResultsPersons() {
  var searchResultPersons = document.querySelectorAll('#results-container li.result.people');

  return Array.prototype.map.call(searchResultPersons, function(e) {
    return e.innerText;
  });
}

function getBackgroundTitles() {
  //var searchDescriptions = document.querySelectorAll("[name='title']");
  var backgroundTitles = document.querySelectorAll("#background-experience [name='title']");

  return Array.prototype.map.call(backgroundTitles, function(e) {
    return e.innerText;
  });
}

casper.start(
  'http://lta.tournamentsoftware.com/sport/teamplayerstats.aspx?id=AE26B6DB-ED63-4277-B089-ADFF66DB4ECA&team=119'
  // 'http://docs.casperjs.org/en/latest/quickstart.html'
  , function() {
  // search for 'casperjs' from google form
  //this.fill('form[action="/search"]', { q: 'casperjs' }, true);
  if (this.exists('div#header')) {
      this.echo('header div exists');
  }

  if (this.exists('table.ruler')) {
      this.echo('table exists');
  }
  
});

// casper.waitForSelector('div.section', function() {
//   console.log("found section div");
// });


// casper.waitForSelector('table.ruler', function() {
//   console.log("found table");
// });

// casper.waitForSelector('div#header', function() {
//   console.log("found header div");
// });

function getSearchedPlayerResults() {
  var searchResultPersons = 
    document.querySelectorAll(
      'table.ruler tr td'
      // 'table.ruler tr'
      );

  return Array.prototype.map.call(searchResultPersons, function (e) {
    // console.log("player info");
    return e.innerText;
  });
}

var searchResultPlayers = [];

var players = [];

casper.waitFor(
  function check() {
    return this.evaluate(function () {
      return document.querySelectorAll('table.ruler tr').length > 0;
    });
  },
  function then() {

    console.log("rows here");

    displaySelectorUpdate (this, 'table.ruler tr');

    // searchResultPersons = 
    searchResultPlayers = 
      this.evaluate(getSearchedPlayerResults);

    // console.log("info", searchResultPlayers);

    const playerColumnCount = 6;
    var playerCol = 0;
    var currentPlayer = {};

    searchResultPlayers.forEach(function (playerInfo, idx) {
      var resultInfoItems = [];

      // currentPlayer.push(playerInfo);

      switch (playerCol) {
        case 0:
          currentPlayer.Rank = playerInfo;

          // console.log("rank", currentPlayer.Rank);
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

      playerCol++;
      if (playerCol > 5) {
        players.push(currentPlayer);

        currentPlayer = {};
        playerCol = 0;
      }


//       resultInfoItems = val.split('\n');

//       console.log("searched result person :", val);
//       console.log("results items len:", resultInfoItems.length);
//       console.log("results items:", resultInfoItems);

      // resultInfoItems.forEach(function (itemInfo) {
//         if (itemInfo.toLowerCase().indexOf(searchJobTitle.toLowerCase()) !== -1) {
//           //resultInfoItems[1] === searchJobTitle) {

//           if (searchResultPersonsIndexMatch === -1) {
//             searchResultPersonsIndexMatch = idx;
//           }
          // console.log("info", playerInfo);
          // console.log("player\n");
//           console.log("job title idx", idx);
//         }
      // });
    });

    players.forEach(function (player) {
      console.log("stored player info", JSON.stringify(player));
      // for (item in player) {
      //   console.log("item", item);
      //   console.log("value", player[item]);
        
      // }
    });

    // displaySelectorUpdate (this, 'form.login-form');

    //   //this.captureSelector('yoursitelist.png', 'ul.your-list');
    // this.fill(
    //   'form.login-form',
    //   {
    //     session_key: 'your linked in user id',
    //     //session_key: 'test',
    //     session_password: 'your linked in pwd'
    //     //session_password: 'test2'
    //   },
    //   true);
  }
);

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('#results-container li.result.people').length > 0;
//     });
//   },
//   function then() {
//     displaySelectorUpdate (this, '#results-container li.result.people');

//     searchResultPersons = this.evaluate(getSearchedPersonResultsPersons);

//     searchResultPersons.forEach(function (val, idx) {
//       var resultInfoItems = [];

//       resultInfoItems = val.split('\n');

//       console.log("searched result person :", val);
//       console.log("results items len:", resultInfoItems.length);
//       console.log("results items:", resultInfoItems);

//       resultInfoItems.forEach(function (itemInfo) {
//         if (itemInfo.toLowerCase().indexOf(searchJobTitle.toLowerCase()) !== -1) {
//           //resultInfoItems[1] === searchJobTitle) {

//           if (searchResultPersonsIndexMatch === -1) {
//             searchResultPersonsIndexMatch = idx;
//           }
//           console.log("job title match", itemInfo);
//           console.log("job title idx", idx);
//         }
//       });
//     });
//   }
// );

casper.then(function() {
  //searchTarget += casper.cli.args.join(' ');
  //
  //casper.echo("args:", casper.cli.args);
  //casper.echo("args len:", casper.cli.args.length);
  //
  //for (var i = 0; i<maxArgs; i++) {
  //  if (casper.cli.has(i)) {
  //    searchTarget += casper.cli.get(i);
  //  }
  //}
  //
  //casper.echo("target:", searchTarget);
  casper.echo("found ruler");

  searchTarget = "";

  //for (var i = 0; i<maxArgs; i++) {
  //  if (casper.cli.has(i)) {
  //    searchTarget += ' ' + casper.cli.get(i);
  //  }
  //}

  for (var i = 0; i<maxArgs; i++) {
    if (casper.cli.has(i)) {
      var arg = casper.cli.get(i);

      if (arg === '-j') {
        arg = "";

        argJobTitle = true;
        argName = false;
        argCompany = false;
        argLocation = false;
        //casper.echo("-j found");
      }
      else if (arg === '-c') {
        arg = "";

        argCompany = true;
        argJobTitle = false;
        argName = false;
        argLocation = false;
      }
      else if (arg === '-l') {
        arg = "";

        argLocation = true;
        argCompany = false;
        argJobTitle = false;
        argName = false;
      }
      else if (arg === '-v') {
        arg = "";

        //console.log("verbose on");
        casper.echo("verbose on");
        argVerbose = true;
      }

      if (argName === true) {
        if (searchTarget.length > 0) {
          searchTarget += ' ';
        }
        searchTarget += arg;
      }
      else if (argJobTitle === true) {
        if (searchJobTitle.length > 0) {
          searchJobTitle += ' ';
        }
        searchJobTitle += arg;
      }
      else if (argCompany === true) {
        if (searchCompany.length > 0) {
          searchCompany += ' ';
        }
        searchCompany += arg;
      }
      else if (argLocation === true) {
        if (searchLocation.length > 0) {
          searchLocation += ' ';
        }
        searchLocation += arg;
      }
    }
  }

  console.log("cnsle target:", searchTarget);
  console.log("cnsle job title:", searchJobTitle);
  console.log("cnsle company:", searchCompany);

  //casper.echo("casp target:", searchTarget);
  //this.echo("this target:", searchTarget);
  //casper.echo("target job:", searchJobTitle);
  //casper.echo("target co:", searchCompany);

});

// casper.waitFor(
//   function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('form.login-form').length > 0;
//     });
//   },
//   function then() {
//     displaySelectorUpdate (this, 'form.login-form');

//       //this.captureSelector('yoursitelist.png', 'ul.your-list');
//     this.fill(
//       'form.login-form',
//       {
//         session_key: 'your linked in user id',
//         //session_key: 'test',
//         session_password: 'your linked in pwd'
//         //session_password: 'test2'
//       },
//       true);
//   }
// );

// casper.then(function() {
//   displaySelectorUpdate (this, 'a.headline');

//   // aggregate results for the 'casperjs' search
//   links = this.evaluate(getLinks);
//   // now search for 'phantomjs' by filling the form again
//   //this.fill('form[action="/search"]', { q: 'phantomjs' }, true);

//   //this.evaluateOrDie(function() {
//   //  return /message sent/.test(document.body.innerText);
//   //}, 'sending message failed');

//   //if (this.exists('h1.page-title')) {
//   //if (this.exists('div.info')) {
// });

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('form#global-search').length > 0;
//     });
//   },
//   function then() {
//     var searchCriteria = searchTarget +
//                           ' ' + searchLocation
//                           // company seems to break search - we filter later on anyway
//                           // + ' ' + searchCompany
//                           + ' ' + searchJobTitle
//                           ;

//     displaySelectorUpdate (this, 'form#global-search');

//     console.log('searchCriteria:', searchCriteria);

//     this.fill(
//       'form#global-search',
//       {
//         keywords: searchCriteria
//         //,
//       },
//       true);
//   }
// );

//casper.then(function () {
//  //this.sendKeys('#main-search-box', 'Odera Ume-Ezeoke');
//  //this.sendKeys('form.contact textarea#message', "Damn, I'm looking good.");
//  //this.click('form.contact input[type="submit"]');
//
//});

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('#results').length > 0;
//     });
//   },
//   function then() {
//     // aggregate results for the 'casperjs' search

//     displaySelectorUpdate (this, '#results');

//     searchResults = this.evaluate(getSearchedPersonLinks);
//     // now search for 'phantomjs' by filling the form again
//     //this.fill('form[action="/search"]', { q: 'phantomjs' }, true);

//     //this.evaluateOrDie(function() {
//     //  return /message sent/.test(document.body.innerText);
//     //}, 'sending message failed');

//     if (this.exists('a.title')) {
//       this.echo('the a.title exists');
//       titles.push("title: " + this.fetchText('a.title'));
//     }
//     else {
//       this.echo('a.title not found');
//     }
//   }
// );

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('#results').length > 0;
//     });
//   },
//   function then() {
//     displaySelectorUpdate (this, '#results');
// //
// //    // aggregate results for the 'casperjs' search
//     searchTitles = this.evaluate(getSearchedPersonTitles);
// //    // now search for 'phantomjs' by filling the form again
// //    //this.fill('form[action="/search"]', { q: 'phantomjs' }, true);
// //
// //    //this.evaluateOrDie(function() {
// //    //  return /message sent/.test(document.body.innerText);
// //    //}, 'sending message failed');
// //
// //    //if (this.exists('h1.page-title')) {
// //    //if (this.exists('div.info')) {
// //    //if (this.exists('a.headline')) {
// //    //if (this.exists('a.title')) {
// //    //  //this.echo('the div exists');
// //    //
// //    //  titles.push("title: " + this.fetchText('a.title'));
// //    //
// //    //  this.echo('the a.title exists');
// //    //}
// //    //else {
// //    //  this.echo('a.title not found');
// //    //}
//   }
// );

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('#results').length > 0;
//     });
//   },
//   function then() {
//     displaySelectorUpdate (this, '#results');
// //
// //    // aggregate results for the 'casperjs' search
//     searchDescriptions = this.evaluate(getSearchedPersonDescriptions);
//   }
// );

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('#results').length > 0;
//     });
//   },
//   function then() {
//     displaySelectorUpdate (this, '#results');
// //
// //    // aggregate results for the 'casperjs' search
//     searchDescriptions = this.evaluate(getSearchedPersonDescriptions);
//   }
// );

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('#results_count p').length > 0;
//     });
//   },
//   function then() {
//     displaySelectorUpdate (this, '#results_count p');

//     resultsCount = this.evaluate(getSearchedPersonResultsCount);

//     resultsCount.forEach(function (val) {
//       var textComponents = val.split(' ');

//       searchResultsCount = +(textComponents[0]);

//       console.log("val:", val);
//       console.log("searchResultsCount:", searchResultsCount);
//     });
//   }
// );

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('#results-container li.result.people').length > 0;
//     });
//   },
//   function then() {
//     displaySelectorUpdate (this, '#results-container li.result.people');

//     searchResultPersons = this.evaluate(getSearchedPersonResultsPersons);

//     searchResultPersons.forEach(function (val, idx) {
//       var resultInfoItems = [];

//       resultInfoItems = val.split('\n');

//       console.log("searched result person :", val);
//       console.log("results items len:", resultInfoItems.length);
//       console.log("results items:", resultInfoItems);

//       resultInfoItems.forEach(function (itemInfo) {
//         if (itemInfo.toLowerCase().indexOf(searchJobTitle.toLowerCase()) !== -1) {
//           //resultInfoItems[1] === searchJobTitle) {

//           if (searchResultPersonsIndexMatch === -1) {
//             searchResultPersonsIndexMatch = idx;
//           }
//           console.log("job title match", itemInfo);
//           console.log("job title idx", idx);
//         }
//       });
//     });
//   }
// );

// casper.then(function () {

//   var idx = -1;
//   var resultItemSelector = "#results-container li.result.people.idx";

//   if (searchResultPersonsIndexMatch === -1) {
//     console.log("default search results index");
//     idx = 2;
//   }
//   else {
//     idx = searchResultPersonsIndexMatch + searchResultPersonsIndexOffset;
//     console.log("adjusted search results index:", idx);
//   }

//   resultItemSelector += idx;
//   resultItemSelector += ' a';

//   console.log('clicked:', resultItemSelector);

// //  //this.sendKeys('#main-search-box', 'Odera Ume-Ezeoke');
// //  //this.sendKeys('form.contact textarea#message', "Damn, I'm looking good.");

//   console.log('clicked:', resultItemSelector);

//   this.click(resultItemSelector);
// });

// casper.waitFor(function check() {
//     return this.evaluate(function() {
//       return document.querySelectorAll('span.full-name').length > 0;
//     });
//   },
//   function then() {
//     displaySelectorUpdate (this, 'span.full-name');

//     backgroundTitles = this.evaluate(getBackgroundTitles);

//     backgroundTitles.forEach(function (val, idx) {
//       var resultInfoItems = [];

//       console.log("background title:", val);
//     });
//   }
// );

// code moved to waitfor above
//casper.then(function() {
//});

//casper.then(function() {
  // aggregate results for the 'phantomjs' search
  //links = links.concat(this.evaluate(getLinks));
//});

casper.run(function() {
  // echo results in some pretty fashion
  this.echo(links.length + ' links found:');

  var fileEntry = {} ;

  fileEntry.name = searchTarget;
  fileEntry.jobs = searchDescriptions;
  fileEntry.jobHistory = backgroundTitles;

  //fs.write('links.txt', JSON.stringify(links), 'w');
  fs.write('links.txt', JSON.stringify(fileEntry) + '\n', 'a');

  fs.write('players.txt', JSON.stringify(players));

  if (argVerbose === true) {

    this.echo(searchResults.length + "search Results found");
    this.echo(' - ' + searchResults.join('\n - '));

    this.echo(searchTitles.length + "search Titles found");
    this.echo(' - ' + searchTitles.join('\n - '));

    this.echo(searchDescriptions.length + "search Descriptions found");
    this.echo(' - ' + searchDescriptions.join('\n - '));

    this.echo(titles.length + "titles found");
    this.echo(' - ' + titles.join('\n - '));
  }
  else {
    console.log("not verbose");
  }

  this.echo(' - '
  + links.join('\n - ')
  ).exit();
});
