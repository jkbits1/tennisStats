/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0 */

// following pattern in first answer.
// second answer is good on dom manips
// https://stackoverflow.com/questions/27448789/angularjs-nested-directives-are-inserted-outside-their-supposed-parent-element
// https://stackoverflow.com/questions/15362868/adding-rows-with-ng-repeat-and-nested-loop

function TablePlayersController ($scope) {
  console.log('table player scope', $scope);

  const sortByName = (a, b) => {
    const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  };

  $scope.sortPlayersByName = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    $scope.players.sort(sortByName);
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
      const wonMatch = b.Won - a.Won;

      if (wonMatch === 0) {
        return sortByName(a, b);
      }

      return wonMatch;
    });
  };

  $scope.sortPlayersByParticipation = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    $scope.players.sort((a, b) => {
      const playedMatch = b.Played - a.Played;

      if (playedMatch === 0) {
        return sortByName(a, b);
      }

      return playedMatch;
    });
  };

  $scope.sortPlayersBySetsWon = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    function getWonCount (player) {
      const info = player.Sets.split('');
      const filt = info.filter(s => {
        return s !== ' ';
      });
      const newJoin = filt.join('');

      return Number(newJoin.split('-')[0]);
    }

    $scope.players.sort((a, b) => {
      const aWon = getWonCount(a);
      const bWon = getWonCount(b);

      const wonMatch = bWon - aWon;

      if (wonMatch === 0) {
        return sortByName(a, b);
      }

      return wonMatch;
    });
  };

  $scope.sortPlayersByGamesWon = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    function getGamesCount (player) {
      const info = player.Games.split('');
      const filt = info.filter(s => {
        return s !== ' ';
      });

      const newJoin = filt.join('');

      return Number(newJoin.split('-')[0]);
    }

    $scope.players.sort((a, b) => {
      const aGames = getGamesCount(a);
      const bGames = getGamesCount(b);

      const gamesMatch = bGames - aGames;

      if (gamesMatch === 0) {
        return sortByName(a, b);
      }

      return gamesMatch;
    });
  };
}

TablePlayersController.$inject = ['$scope'];

function TablePlayersDirective () {
    return {
        restrict: 'E',
        templateUrl: './app/components/TablePlayers.html',
        scope: {
            players: '<'
        },
        controller: TablePlayersController,
        link: function(scope, element) {
        }
    };
};

export const TablePlayers = TablePlayersDirective;
