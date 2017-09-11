/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

function PlayersListsController() {
  this.teamname3 = 'Barnet III';
  this.teamname5 = 'Barnet V';

  this.managePlayersData = data => {
    console.log('players arrived', data);

    const playerFn = this.httpPlayersService.getPlayerData('players', this);

    playerFn(data);
  };
};

PlayersListsController.createResolveObject = teamId => {
  return {
    playersData: ['httpPlayersService', httpPlayersService => {
      return httpPlayersService.getPlayers(teamId);
    }]
  };
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

// PlayersListsController.$inject = ['httpPlayersService'];

export const PlayersListsCtrl = PlayersListsController;
