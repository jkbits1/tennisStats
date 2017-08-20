/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0 */

class TeamController {
  constructor() {
    this.test = 'test';

  //   this.players =
  // // [initialPlayer];
  //   angular.fromJson(
  //     [{Rank: '101', Name: 'ppJohn Kelly', Won: '1', Played: '9', Sets: '2 - 9', Games: '31 - 67'},
  //       {Rank: '11', Name: 'ppMike Milfull', Won: '1', Played: '9', Sets: '2 - 10', Games: '40 - 65'},
  //       {Rank: '12', Name: 'ppJohn Trotter', Won: '0', Played: '3', Sets: '1 - 3', Games: '10 - 22'}
  //     ]);
  }
}

export const Team = {
  restrict: 'E'
, template: require('./Team.html')
, controller: TeamController
, bindings: {
    players: '<'
  }
, link: function (scope, element) {
    console.log('team scope', scope);
  }
};
