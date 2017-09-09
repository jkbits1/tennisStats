/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

function PlayersListsController() {
};

PlayersListsController.prototype.loadPlayersListsBase = function () {
  const handleHttpError = errResp => {
    // console.log('trusted', trustedUrl.unwrapTrustedValue());
    // console.log('error', errResp);
  };

  const teamIds = [3, 5];

  const getPlayerDatas = [
    this.httpPlayersService.getPlayerData('players3', this)
  , this.httpPlayersService.getPlayerData('players5', this)
  ];

  teamIds.forEach((teamId, idx) => {
    this.httpPlayersService.getPlayers(teamId)
    .then(getPlayerDatas[idx], handleHttpError);
  });
};

PlayersListsController.$inject = ['httpPlayersService'];

export const PlayersListsCtrl = PlayersListsController;
