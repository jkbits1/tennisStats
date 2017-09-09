/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

// import {PlayersListsCtrl} from './PlayersLists';
import {TeamsDataComponentCtrl} from './TeamsDataComponentController';

// class TeamsDataComponentController extends PlayersListsCtrl {
//   /** @ngInject */
//   constructor (httpPlayersService) {
//     super();

//     this.httpPlayersService = httpPlayersService;

//     // $scope.teamname = 'Barnet III';
//     this.teamname3 = 'Barnet III';

//     this.loadPlayersListsBase();
//   }
// }

// TeamsDataComponentController.$inject = ['httpPlayersService'];

export const TeamsDataComponent = {
  template: require('./TeamsDataComponent.html'),
  controller: TeamsDataComponentCtrl
  // bindings: {}
};

