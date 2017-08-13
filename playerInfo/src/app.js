const path = require('path');
const fs = require('fs');
// const favicon = require('serve-favicon');
// const compress = require('compression');
// const cors = require('cors');
// const helmet = require('helmet');
// const bodyParser = require('body-parser');

const feathers = require('feathers');
// const configuration = require('feathers-configuration');
// const hooks = require('feathers-hooks');
// const rest = require('feathers-rest');

// db
const NeDB = require('nedb');
const service = require('feathers-nedb');

// const handler = require('feathers-errors/handler');
// const notFound = require('feathers-errors/not-found');

// const middleware = require('./middleware');
// const services = require('./services');
// const appHooks = require('./app.hooks');

const app = feathers();

// Load app configuration
// app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
// app.use(cors());
// app.use(helmet());
// app.use(compress());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
// app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
// app.configure(hooks());
// app.configure(rest());


// Configure other middleware (see `middleware/index.js`)
// app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
// app.use(notFound());
// app.use(handler());

// app.hooks(appHooks);

module.exports = app;

const players = app.service('/players');

function services () {
  this.use('/players', service({ Model: playerModel() }));
}

function playerModel () {
  return new NeDB({
    filename:
      // path.join('examples', 'step', 'data', 'players.db')
      '/usr/src/app/node_modules/players.db'
  , autoload: true

  });
}

fs.readFile('./players.txt', 'utf8', (err, data) => {
  if (err) {
    throw err;
  }


  console.log("remove");

  players.remove(null, {nedb: {multi: true}})
  .then(results => {
    console.log("removed all players", results)

    const playerDetails = JSON.parse(data);
    const playerPromises = [];

    playerDetails.forEach(player => {
      console.log(player);

      const playerPromise = players.create(player);

      playerPromises.push(playerPromise);
    }, this);

    return Promise.all(playerPromises);
  })
  .then(results => {

    // results.forEach(result => {
    //   console.log("created player", result);
    // });

    return players.find();
  })
  .then(results => {
    console.log("find all players", results)
  })
  .catch(err => console.log("error", err));
  // .catch(err => console.log("remove error", err));
  // .then()


});

