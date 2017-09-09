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
    .state('teams', {
      url: '/teams',
      template: `<h1>Teams List</h1>
      <a href="/team3">team 3</a>
      <br>
      <a href="/team5">team 5</a>
      `
      // component: 'app'
    });

  $stateProvider
    .state('team3', {
      url: '/team3',
      // template: '<h1>hi there</h1>'
      component: 'tableRowsComponent'
    });

  $stateProvider
    .state('team5', {
      url: '/team5',
      component: 'app'
    });
}
