/* eslint angular/controller-as-route: 0 */

export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })
    .state('teams', {
      url: '/teams',
      template: `<h1>Teams List</h1>
      <a href="/team3">team 3</a>
      <br>
      <a href="/team5">team 5</a>
      `
      // component: 'app'
    })
    .state('team3', {
      url: '/team3',
      // template: '<h1>hi there</h1>'
      component: 'teamsDataComponent'
    })
    .state('team3a', {
      url: '/team3a',
      templateUrl: './app/components/Team3.html',
      controller: 'teamsDataController as $ctrl'
    })
    .state('team5', {
      url: '/team5',
      // component: 'app'
      templateUrl: './app/components/Team5.html',
      controller: 'teamsDataController as $ctrl'
    })
    .state('team5a', {
      url: '/team5a',
      // component: 'app'
      component: 'team5Component'
    });
}
