/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

class TableRowsComponentController {
  /** @ngInject */
  constructor ($scope, $http, $sce) {
    $scope.players =
      angular.fromJson(
        [{Rank: '10', Name: 'xxJohn Kelly', Won: '1', Played: '9', Sets: '2 - 9', Games: '31 - 67'},
          {Rank: '11', Name: 'xxMike Milfull', Won: '1', Played: '9', Sets: '2 - 10', Games: '40 - 65'},
          {Rank: '12', Name: 'xxJohn Trotter', Won: '0', Played: '3', Sets: '1 - 3', Games: '10 - 22'}
        ]);

    const url = 'http://localhost:8080/teams/';
    // const url2 = 'http://localhost:8080/players?callback=JSON_CALLBACK';

    // const trustedUrl = $sce.trustAsResourceUrl(url);
    // const trustedUrl2 = $sce.trustAsResourceUrl(url2);

    const handleHttpError = errResp => {
      // console.log('trusted', trustedUrl.unwrapTrustedValue());
      console.log('error', errResp);
    };

    const getPlayerData = players => data => {
      // console.log('trusted', trustedUrl);
      console.log('data', data);

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

      console.log('scope players', players);

      // $scope.players = processedPI;
      $scope[players] = processedPI;
    };

    const teamIds = [5, 3];

    // const trustedUrls = [
    //   $sce.trustAsResourceUrl(url + 5)
    // , $sce.trustAsResourceUrl(url + 3)
    // ];

    const getPlayerDatas = [
      getPlayerData('players')
    , getPlayerData('players3')
    ];

    $scope.teamname = 'Barnet III';

    teamIds.forEach((teamId, idx) => {
      $http.jsonp($sce.trustAsResourceUrl(url + teamId), {jsonpCallbackParam: 'callback'})
      .then(getPlayerDatas[idx], handleHttpError);
    });
  }
}

TableRowsComponentController.$inject = ['$scope', '$http', '$sce'];

export const TableRowsComponent = {
  template: require('./TableRowsComponent.html'),
  controller: TableRowsComponentController
  // bindings: {}
};

