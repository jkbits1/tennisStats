export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    });

  $stateProvider
    .state('team5', {
      url: '/team5',
      component: 'app'
    });

  $stateProvider
    .state('teams', {
      url: '/teams',
      template: `<h1>teams</h1>
      <a href="http://localhost:3002/team3">team 3</a>
      <a href="http://localhost:3002/team5">team 5</a>
      `
      // component: 'app'
    });

  $stateProvider
    .state('team3', {
      url: '/team3',
      // template: '<h1>hi there</h1>'
      component: 'tableRowsComponent'
    });
}
