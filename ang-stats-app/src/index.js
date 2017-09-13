/* eslint linebreak-style: 0, comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, func-names: 0, prefer-arrow-callback: 0 */

import angular from 'angular';
// import 'todomvc-app-css/index.css';

import {TodoService} from './app/todos/todos';
import {PlayerService} from './app/players/players';
import {App} from './app/containers/App';
import {MainSection} from './app/components/MainSection';

import {TeamsListComponent} from './app/components/TeamsListComponent';
import {TeamsDataCtrl} from './app/components/TeamsData';
import {TeamsDataComponent} from './app/components/TeamsDataComponent';
import {Team5Component} from './app/components/Team5Component';
import {TablePlayers} from './app/components/TablePlayers';
import {RowPlayer} from './app/components/RowPlayer';

import {HttpPlayersService} from './app/services/HttpPlayersService';

import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('todoService', TodoService)
  .service('playerService', PlayerService)
  .service('httpPlayersService', HttpPlayersService)
  .component('app', App)
  .component('mainSection', MainSection)
  // .component('teamComponent', Team)
  // .component('playerItem', PlayerItem)
  // .component('todoTextInput', TodoTextInput)
  // .component('todoItem', TodoItem)
  .component('teamsListComponent', TeamsListComponent)
  .controller('teamsDataController', TeamsDataCtrl)
  .component('teamsDataComponent', TeamsDataComponent)
  .component('team5Component', Team5Component)
  .directive('tablePlayers', TablePlayers)
  // .component('tablePlayers', TablePlayers)
  .directive('rowPlayer', RowPlayer);
