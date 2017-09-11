/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0, angular/definedundefined: 0 */

import {PlayersListsCtrl} from './PlayersLists';

class TeamsDataComponentController extends PlayersListsCtrl {
  /** @ngInject */
  constructor (httpPlayersService) {
    super();

    this.httpPlayersService = httpPlayersService;

    this.checkForPlayers();
  }

  $onChanges (changes) {
    if (changes.playersData) {
      this.managePlayersData(this.playersData);
    }

    if (changes.teamInfo) {
      console.log('teamInfo', this.teamInfo);
    }
  }
}

export const TeamsDataComponentCtrl = TeamsDataComponentController;
