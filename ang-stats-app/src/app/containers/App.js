import {SHOW_ALL} from '../constants/TodoFilters';
// import {initialTodo} from '../todos/todos';
import {initialPlayer} from '../players/players';

class AppController {
  constructor() {
    this.todos =
      // [initialTodo];
      // JSON.parse(
        angular.fromJson(
          [{Rank: '10', Name: 'John Kelly', Won: '1', Played: '9', Sets: '2 - 9', Games: '31 - 67'},
            {Rank: '11', Name: 'Mike Milfull', Won: '1', Played: '9', Sets: '2 - 10', Games: '40 - 65'},
            {Rank: '12', Name: 'John Trotter', Won: '0', Played: '3', Sets: '1 - 3', Games: '10 - 22'}
          ]);
    this.players = [initialPlayer];
    this.filter = SHOW_ALL;
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
