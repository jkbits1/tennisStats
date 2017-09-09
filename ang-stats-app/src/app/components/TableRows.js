/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0 */

import {PlayersListsCtrl} from './PlayersLists';

class TableRowsController extends PlayersListsCtrl {
  /** @ngInject */
  constructor(httpPlayersService) {
    super();

    console.log('http players svc', httpPlayersService);

    this.httpPlayersService = httpPlayersService;

    this.teamname5 = 'Barnet V';

    this.loadPlayersListsBase();
  }
}

TableRowsController.$inject = ['httpPlayersService'];

export const TableRowsCtrl = TableRowsController;

// export const TableRows = {
//   template: require('./TableRows.html'),
//   controller: TableRowsController
//   // ,
//   // bindings: {
//   //   todos: '=',
//   //   players: '<',
//   //   filter: '<'
//   // }
// };
