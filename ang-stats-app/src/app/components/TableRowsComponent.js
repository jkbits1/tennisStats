/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

import {BaseTableCtrl} from './BaseTable';

class TableRowsComponentController extends BaseTableCtrl {
  /** @ngInject */
  constructor (httpPlayersService) {
    super();

    this.httpPlayersService = httpPlayersService;

    // $scope.teamname = 'Barnet III';
    this.teamname3 = 'Barnet III';

    // this.loadPlayersLists();
    this.loadPlayersListsBase();
  }
}

// TableRowsComponentController.prototype.loadPlayersLists = function () {
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
//     // $http.jsonp($sce.trustAsResourceUrl(url + teamId), {jsonpCallbackParam: 'callback'})
//     this.httpPlayersService.getPlayers(teamId)
//     .then(getPlayerDatas[idx], handleHttpError);
//   });
// };

TableRowsComponentController.$inject = ['httpPlayersService'];

export const TableRowsComponent = {
  template: require('./TableRowsComponent.html'),
  controller: TableRowsComponentController
  // bindings: {}
};

