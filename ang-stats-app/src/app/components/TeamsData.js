/* eslint linebreak-style: 0, no-undef:0, comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0 */

import {PlayersListsCtrl} from './PlayersLists';

class TeamsDataController extends PlayersListsCtrl {
  /** @ngInject */
  constructor(httpPlayersService, playersData, teamInfo) {
    super();

    this.httpPlayersService = httpPlayersService;

    this.teamInfo = teamInfo;

    this.managePlayersData(playersData);
  }
}

export const TeamsDataCtrl = TeamsDataController;
