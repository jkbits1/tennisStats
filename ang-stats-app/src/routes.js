/* eslint linebreak-style: 0, angular/controller-as-route: 0, no-unused-vars: 0 */

export default routesConfig;

import {PlayersListsCtrl} from './app/components/PlayersLists';

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  const resolveTeam3 = PlayersListsCtrl.createResolveObject('3');
  const resolveTeam5 = PlayersListsCtrl.createResolveObject('5');

  $stateProvider
    .state('index', {
      url: '/',
      component: 'teamsListComponent'
    })
    .state('teams', {
      url: '/teams',
      component: 'teamsListComponent'
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
