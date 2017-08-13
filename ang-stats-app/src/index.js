import angular from 'angular';
import 'todomvc-app-css/index.css';

import {TodoService} from './app/todos/todos';
import {PlayerService} from './app/players/players';
import {App} from './app/containers/App';
import {Header} from './app/components/Header';
import {MainSection} from './app/components/MainSection';
import {TodoTextInput} from './app/components/TodoTextInput';
import {TodoItem} from './app/components/TodoItem';
import {PlayerItem} from './app/components/PlayerItem';
import {Footer} from './app/components/Footer';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

angular
  .module('app', ['ui.router'])
  .config(routesConfig)
  .service('todoService', TodoService)
  .service('playerService', PlayerService)
  .component('app', App)
  .component('headerComponent', Header)
  .component('footerComponent', Footer)
  .component('mainSection', MainSection)
  .component('playerItem', PlayerItem)
  .component('todoTextInput', TodoTextInput)
  .component('todoItem', TodoItem);
