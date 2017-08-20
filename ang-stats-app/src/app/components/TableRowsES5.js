/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0 */

function TableRowsES5Controller ($scope) {
    // $scope.players = [
    //     {
    //         name: 'Name 1',
    //         status: 'ready'
    //     },
    //     {
    //         name: 'Name 2',
    //         status: 'pending'
    //     },
    //     {
    //         name: 'Name 3',
    //         status: 'error'
    //     }
    // ];

    // this.players =
    $scope.players =
    // [initialPlayer];
      angular.fromJson(
        [{Rank: '10', Name: 'xxJohn Kelly', Won: '1', Played: '9', Sets: '2 - 9', Games: '31 - 67'},
          {Rank: '11', Name: 'xxMike Milfull', Won: '1', Played: '9', Sets: '2 - 10', Games: '40 - 65'},
          {Rank: '12', Name: 'xxJohn Trotter', Won: '0', Played: '3', Sets: '1 - 3', Games: '10 - 22'}
        ]);
};

TableRowsES5Controller.$inject = ['$scope'];

export const TableRowsFiveCtrl = TableRowsES5Controller;
