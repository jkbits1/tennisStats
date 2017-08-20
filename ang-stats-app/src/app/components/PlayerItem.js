/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0 */

class PlayerItemController {
  constructor() {
    // this.text = false;
    this.editing = false;

    // this.$postLink = function() {
    //     $timeout(function() {
    //         var elem = document.getElementById(this.gridId);
    //         // do something with elem now that the DOM has had it's bindings applied
    //     });
    // }
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
  restrict: 'A'
, replace: true
, template: require('./PlayerItem.html')
, controller: PlayerItemController
, bindings: {
    player: '<'
  }
// , link: function (scope, element) {
//     console.log('player item scope', scope);
//   }
};
