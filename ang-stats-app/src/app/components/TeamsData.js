/* eslint no-undef:0, comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0 */

import {PlayersListsCtrl} from './PlayersLists';

class TeamsDataController extends PlayersListsCtrl {
  /** @ngInject */
  constructor(httpPlayersService, playersData) {
    super();

    console.log('http players svc', httpPlayersService);

    this.httpPlayersService = httpPlayersService;

    this.teamname3 = 'Barnet III';
    this.teamname5 = 'Barnet V';

    this.playersData = playersData;

    console.log('playersData', this.playersData);

    const playerFn = this.httpPlayersService.getPlayerData('players', this);

    playerFn(this.playersData);

    console.log('players', this.players);

    this.loadPlayersListsBase();
  }
}

export const TeamsDataCtrl = TeamsDataController;

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
