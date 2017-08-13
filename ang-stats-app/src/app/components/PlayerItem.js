class PlayerItemController {
  constructor() {
    // this.text = false;
    this.editing = false;
  }

  // handleDoubleClick() {
  //   // this.editing = true;
  // }

  // handleSave(text) {
  //   this.onSave({
  //     player: {
  //       text,
  //       id: this.player.id
  //     }
  //   });
  //   // this.editing = false;
  // }

  // handleDestroy(id) {
  //   this.onDestroy({id});
  // }
}

export const PlayerItem = {
  template: require('./PlayerItem.html'),
  controller: PlayerItemController,
  bindings: {
    player: '<'
  }
};
