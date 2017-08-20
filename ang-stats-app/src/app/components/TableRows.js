/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0 */

// var app = angular.module('plunker', []);

// app.controller('MainCtrl', function($scope) {
//     $scope.queries = [
//         {
//             name: 'Name 1',
//             status: 'ready'
//         },
//         {
//             name: 'Name 2',
//             status: 'pending'
//         },
//         {
//             name: 'Name 3',
//             status: 'error'
//         }
//     ];
// });

class TableRowsController {
  /** @ngInject */
  constructor($scope) {
    $scope.players = [
        {
            name: 'Name 1',
            status: 'ready'
        },
        {
            name: 'Name 2',
            status: 'pending'
        },
        {
            name: 'Name 3',
            status: 'error'
        }
    ];
  }
}

export const TableRows = {
  template: require('./TableRows.html'),
  controller: TableRowsController,
  bindings: {
    todos: '=',
    players: '<',
    filter: '<'
  }
};
