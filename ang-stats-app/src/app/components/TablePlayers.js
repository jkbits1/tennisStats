/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0 */

// following pattern in first answer.
// second answer is good on dom manips
// https://stackoverflow.com/questions/27448789/angularjs-nested-directives-are-inserted-outside-their-supposed-parent-element
// https://stackoverflow.com/questions/15362868/adding-rows-with-ng-repeat-and-nested-loop

function TablePlayersController ($scope) {
  console.log('table player scope', $scope);

  $scope.sortPlayersByName = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    $scope.players.sort((a, b) => {
      const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });
  };

  $scope.sortPlayersByRank = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    $scope.players.sort((a, b) => {
      return a.Rank - b.Rank;
    });
  };

  $scope.sortPlayersByWins = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    $scope.players.sort((a, b) => {
      return b.Won - a.Won;
    });
  };

  $scope.sortPlayersByParticipation = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    $scope.players.sort((a, b) => {
      return b.Played - a.Played;
    });
  };
}

TablePlayersController.$inject = ['$scope'];

function TablePlayersDirective () {
    return {
        restrict: 'E',
        templateUrl: './app/components/TablePlayers.html',
        scope: {
            players: '='
        },
        controller: TablePlayersController,
        link: function(scope, element) {
        }
    };
};

export const TablePlayers = TablePlayersDirective;
