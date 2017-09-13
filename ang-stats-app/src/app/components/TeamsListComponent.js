/* eslint linebreak-style: 0, comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

// import {TeamsDataCtrl} from './TeamsData';

class TeamsListComponentCtrl {
  /** @ngInject */
  constructor () {
    this.teamInfoItems = [
      {
        teamName: 'Middx 3',
        teamRoute: '/team3'
      },
      {
        teamName: 'Middx 5',
        teamRoute: '/team5'
      }
    ];
  }
}

export const TeamsListComponent = {
  template: require('./TeamsListComponent.html'),
  controller: TeamsListComponentCtrl
};

