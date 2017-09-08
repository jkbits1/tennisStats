/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

function TableRowsES5Controller (httpPlayersService) {
  console.log('http players svc', httpPlayersService);

    this.players =
      angular.fromJson(
        [{Rank: '10', Name: 'xxJohn Kelly', Won: '1', Played: '9', Sets: '2 - 9', Games: '31 - 67'},
          {Rank: '11', Name: 'xxMike Milfull', Won: '1', Played: '9', Sets: '2 - 10', Games: '40 - 65'},
          {Rank: '12', Name: 'xxJohn Trotter', Won: '0', Played: '3', Sets: '1 - 3', Games: '10 - 22'}
        ]);

    const handleHttpError = errResp => {
      // console.log('trusted', trustedUrl.unwrapTrustedValue());
      console.log('error', errResp);
    };

    const teamIds = [5, 3];

    const getPlayerDatas = [
      httpPlayersService.getPlayerData('players', this)
    , httpPlayersService.getPlayerData('players3', this)
    ];

    // $scope.teamname = 'Barnet V';
    this.teamname = 'Barnet V';

    teamIds.forEach((teamId, idx) => {
      httpPlayersService.getPlayers(teamId)
      .then(getPlayerDatas[idx], handleHttpError);
    });
};

TableRowsES5Controller.$inject = ['httpPlayersService'];

export const TableRowsFiveCtrl = TableRowsES5Controller;
