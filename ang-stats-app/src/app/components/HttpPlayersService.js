
// angular
//   .module('app')
//   .service('HttpPlayersService', HttpPlayersService);

export const HttpPlayersService = function ($http) {
  this.getEmails = function () {
    return $http.get('/emails');
  };
};
