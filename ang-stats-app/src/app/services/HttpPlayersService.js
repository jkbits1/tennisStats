
// angular
//   .module('app')
//   .service('HttpPlayersService', HttpPlayersService);

function PlayersService($http, $sce) {
  const url = 'http://localhost:8080/teams/';

  this.getPlayers = function (teamId) {
    return $http.jsonp($sce.trustAsResourceUrl(url + teamId), {jsonpCallbackParam: 'callback'});
  };

  this.getPlayerData = function (players, ctrl) {
    return function (data) {
      // console.log('trusted', trustedUrl);
      // console.log('data', data);

      const getSetsCount = (won, player) => {
        let idx = 0;

        if (won === false) {
          idx = 1;
        }

        const info = player.Sets.split('');
        const filt = info.filter(s => {
          return s !== ' ';
        });
        const newJoin = filt.join('');

        return Number(newJoin.split('-')[idx]);
      };

      const getGamesCount = (won, player) => {
        let idx = 0;

        if (won === false) {
          idx = 1;
        }

        const info = player.Games.split('');
        const filt = info.filter(s => {
          return s !== ' ';
        });

        const newJoin = filt.join('');

        return Number(newJoin.split('-')[idx]);
      };

      const getWonCount = player => getSetsCount(true, player);
      const getLostCount = player => getSetsCount(false, player);

      const getGamesWon = player => getGamesCount(true, player);
      const getGamesLost = player => getGamesCount(false, player);

      const rawPlayerInfo = data.data;

      const processedPI = rawPlayerInfo.map(player => {
        const playerProcessed = Object.assign({}, player);

        playerProcessed.SetsWon = getWonCount(player);
        playerProcessed.SetsLost = getLostCount(player);

        playerProcessed.GamesWon = getGamesWon(player);
        playerProcessed.GamesLost = getGamesLost(player);

        return playerProcessed;
      });

      // console.log('scope players', players);

      // $scope[players] = processedPI;
      ctrl[players] = processedPI;
    };
  };
}

PlayersService.$inject = ['$http', '$sce'];

export const HttpPlayersService = PlayersService;
