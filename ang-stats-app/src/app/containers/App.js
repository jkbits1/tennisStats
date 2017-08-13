import {SHOW_ALL} from '../constants/TodoFilters';
import {initialTodo} from '../todos/todos';
import {initialPlayer} from '../players/players';

class AppController {
  constructor() {
    this.todos = [initialTodo];
    this.players = [initialPlayer];
    this.filter = SHOW_ALL;
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
