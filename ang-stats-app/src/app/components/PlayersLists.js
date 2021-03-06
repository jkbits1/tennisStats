/* eslint linebreak-style: 0, comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0, angular/definedundefined: 0 */

function PlayersListsController() {

  this.managePlayersData = data => {
    console.log('players arrived', data);

    const playerFn = this.httpPlayersService.getPlayerData('players', this);

    playerFn(data);
  };

  this.checkForPlayers = () => {
    if (this.players === undefined) {
      console.log('no players yet');

      this.players = [];
    } else {
      console.log('players', this.players);
    }
  };
};

PlayersListsController.createResolveObject = teamId => {

  let teamName = '';
  let teamLink = '';

  if (teamId === '3') {
    teamName = 'Barnet III';
    teamLink = 'http://lta.tournamentsoftware.com/sport/teamplayerstats.aspx?id=AE26B6DB-ED63-4277-B089-ADFF66DB4ECA&team=116';
  } else {
    teamName = 'Barnet V';
    teamLink = 'http://lta.tournamentsoftware.com/sport/teamplayerstats.aspx?id=AE26B6DB-ED63-4277-B089-ADFF66DB4ECA&team=119';
  }

  return {
    playersData: ['httpPlayersService', httpPlayersService => {
      return httpPlayersService.getPlayers(teamId);
    }],
    teamInfo: function () {
      return {
        teamId: teamId,
        teamName: teamName,
        teamLink: teamLink
      };
    }
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
