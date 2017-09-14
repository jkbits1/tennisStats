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
      url: '/app/',
      component: 'teamsListComponent'
    })
    .state('teams', {
      url: '/app/teams',
      component: 'teamsListComponent'
    })
    .state('teams2', {
      url: '/teams',
      component: 'teamsListComponent'
    })
    .state('team3', {
      url: '/app/team3',
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
      url: '/app/team3b',
      template: require('./app/components/TeamStats.html'),
      controller: 'teamsDataController as $ctrl',
      resolve: resolveTeam3
    })
    .state('team5', {
      url: '/app/team5',
      template: require('./app/components/TeamStats.html'),
      controller: 'teamsDataController as $ctrl',
      resolve: resolveTeam5
    })
    .state('team5a', {
      url: '/app/team5a',
      // component: 'app'
      component: 'teamsDataComponent',
      resolve: resolveTeam5
    });
}
