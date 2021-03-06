/* eslint linebreak-style: 0, comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

// import {TeamsDataCtrl} from './TeamsData';
import {TeamsDataComponentCtrl} from './TeamsDataComponentController';

export const TeamsDataComponent = {
  template: require('./TeamStats.html'),
  controller: TeamsDataComponentCtrl,
  bindings: {
    playersData: '<',
    teamInfo: '<'
  }
};

