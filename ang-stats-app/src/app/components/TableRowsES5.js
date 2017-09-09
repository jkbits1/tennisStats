/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

import {BaseTableCtrl} from './BaseTable';

TableRowsES5Controller.prototype = Object.create(BaseTableCtrl.prototype);

function TableRowsES5Controller (httpPlayersService) {
  console.log('http players svc', httpPlayersService);

  this.httpPlayersService = httpPlayersService;

  // $scope.teamname = 'Barnet V';
  this.teamname5 = 'Barnet V';

  this.loadPlayersListsBase();

  // this.players =
  //   angular.fromJson(
  //     [{Rank: '10', Name: 'xxJohn Kelly', Won: '1', Played: '9', Sets: '2 - 9', Games: '31 - 67'},
  //       {Rank: '11', Name: 'xxMike Milfull', Won: '1', Played: '9', Sets: '2 - 10', Games: '40 - 65'},
  //       {Rank: '12', Name: 'xxJohn Trotter', Won: '0', Played: '3', Sets: '1 - 3', Games: '10 - 22'}
  //     ]);
};

// TableRowsES5Controller.prototype.loadPlayersLists = function () {
//   const handleHttpError = errResp => {
//     // console.log('trusted', trustedUrl.unwrapTrustedValue());
//     console.log('error', errResp);
//   };

//   const teamIds = [5, 3];

//   const getPlayerDatas = [
//     this.httpPlayersService.getPlayerData('players', this)
//   , this.httpPlayersService.getPlayerData('players3', this)
//   ];

//   teamIds.forEach((teamId, idx) => {
//     this.httpPlayersService.getPlayers(teamId)
//     .then(getPlayerDatas[idx], handleHttpError);
//   });
// };

TableRowsES5Controller.$inject = ['httpPlayersService'];

export const TableRowsFiveCtrl = TableRowsES5Controller;
