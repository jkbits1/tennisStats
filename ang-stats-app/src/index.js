/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, func-names: 0, prefer-arrow-callback: 0 */

import angular from 'angular';
// import 'todomvc-app-css/index.css';

import {TodoService} from './app/todos/todos';
import {PlayerService} from './app/players/players';
import {App} from './app/containers/App';
// import {Header} from './app/components/Header';
import {MainSection} from './app/components/MainSection';
// import {TodoTextInput} from './app/components/TodoTextInput';
// import {TodoItem} from './app/components/TodoItem';
// import {Team} from './app/components/Team';
// import {PlayerItem} from './app/components/PlayerItem';
// import {Footer} from './app/components/Footer';

// import {TableRows} from './app/components/TableRows';
import {TableRowsFiveCtrl} from './app/components/TableRowsES5';
import {TablePlayers} from './app/components/TablePlayers';
import {RowPlayer} from './app/components/RowPlayer';

import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('todoService', TodoService)
  .service('playerService', PlayerService)
  .component('app', App)
  // .component('headerComponent', Header)
  // .component('footerComponent', Footer)
  .component('mainSection', MainSection)
  // .component('teamComponent', Team)
  // .component('playerItem', PlayerItem)
  // .component('todoTextInput', TodoTextInput)
  // .component('todoItem', TodoItem)
  // .controller('tableRowsController', TableRows)
  .controller('tableRowsFiveController', TableRowsFiveCtrl)
  .directive('tablePlayers', TablePlayers)
  // .component('tablePlayers', TablePlayers)
  .directive('rowPlayer', RowPlayer);
