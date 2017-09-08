/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

class TableRowsComponentController {
  /** @ngInject */
  constructor ($http, $sce, httpPlayersService) {

    const handleHttpError = errResp => {
      // console.log('trusted', trustedUrl.unwrapTrustedValue());
      console.log('error', errResp);
    };

    const teamIds = [5, 3];

    const getPlayerDatas = [
      httpPlayersService.getPlayerData('players', this)
    , httpPlayersService.getPlayerData('players3', this)
    ];

    // $scope.teamname = 'Barnet III';
    this.teamname = 'Barnet III';

    teamIds.forEach((teamId, idx) => {
      // $http.jsonp($sce.trustAsResourceUrl(url + teamId), {jsonpCallbackParam: 'callback'})
      httpPlayersService.getPlayerData(teamId)
      .then(getPlayerDatas[idx], handleHttpError);
    });
  }
}

TableRowsComponentController.$inject = ['$http', '$sce', 'httpPlayersService'];

export const TableRowsComponent = {
  template: require('./TableRowsComponent.html'),
  controller: TableRowsComponentController
  // bindings: {}
};

