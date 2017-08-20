class HeaderController {
  /** @ngInject */
  constructor(todoService, playerService) {
    this.todoService = todoService;
    this.playerService = playerService;
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.todos = this.todoService.addTodo(text, this.todos);
    }
  }
}

export const Header = {
  template: require('./Header.html'),
  controller: HeaderController,
  bindings: {
    todos: '=',
    players: '='
  }
};
