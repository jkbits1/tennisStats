/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0, angular/definedundefined: 0 */

import {PlayersListsCtrl} from './PlayersLists';

class TeamsDataComponentController extends PlayersListsCtrl {
  /** @ngInject */
  constructor (httpPlayersService) {
    super();

    this.httpPlayersService = httpPlayersService;

    this.teamname3 = 'Barnet III';
    this.teamname5 = 'Barnet V';

    if (this.players === undefined) {
      console.log('no players yet');

      this.players = [];
    } else {
      console.log('players', this.players);
    }

    this.loadPlayersListsBase();
  }

  $onChanges (changes) {
    if (changes.playersData) {
      console.log('players arrived', this.playersData);

      const playerFn = this.httpPlayersService.getPlayerData('players', this);
      // this.players = Object.assign({}, this.players);

      playerFn(this.playersData);
    }
  }
}

export const TeamsDataComponentCtrl = TeamsDataComponentController;
