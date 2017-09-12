/* eslint angular/controller-as-route: 0, no-unused-vars: 0 */

export default routesConfig;

import {PlayersListsCtrl} from './app/components/PlayersLists';

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  const resolveTeam3 = PlayersListsCtrl.createResolveObject('3');
  const resolveTeam5 = PlayersListsCtrl.createResolveObject('5');

  $stateProvider
    .state('app', {
      url: '/',
      template: `<h1>Teams List</h1>
      <a href="/team3">team 3</a>
      <br>
      <a href="/team5">team 5</a>
      `
    }
    // {
    //   url: '/',
    //   component: 'app'
    // }
    )
    .state('teams', {
      url: '/teams',
      template: `<h1>Teams List</h1>
      <a href="/team3">team 3</a>
      <br>
      <a href="/team5">team 5</a>
      `
    })
    .state('team3', {
      url: '/team3',
      component: 'teamsDataComponent',
      resolve: resolveTeam3
    })
    .state('team3a', {
      url: '/team3a',
      template: require('./app/components/TeamStats.html'),
      controller: 'teamsDataController as $ctrl',
      resolve: resolveTeam3
    })
    .state('team3b', {
      url: '/team3b',
      template: require('./app/components/TeamStats.html'),
      controller: 'teamsDataController as $ctrl',
      resolve: resolveTeam3
    })
    .state('team5', {
      url: '/team5',
      template: require('./app/components/TeamStats.html'),
      controller: 'teamsDataController as $ctrl',
      resolve: resolveTeam5
    })
    .state('team5a', {
      url: '/team5a',
      // component: 'app'
      component: 'teamsDataComponent',
      resolve: resolveTeam5
    });
}
