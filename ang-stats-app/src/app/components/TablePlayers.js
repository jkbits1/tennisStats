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

  const getSetsCount = (won, player) => {
    let idx = 0;

    if (won === false) {
      idx = 1;
    }

    const info = player.Sets.split('');
    const filt = info.filter(s => {
      return s !== ' ';
    });
    const newJoin = filt.join('');

    return Number(newJoin.split('-')[idx]);
  };

  const getWonCount = player => getSetsCount(true, player);
  const getLostCount = player => getSetsCount(false, player);

  const sortBySets = (won, a, b) => {
    let aCount = 0;
    let bCount = 0;

    if (won) {
      aCount = getWonCount(a);
      bCount = getWonCount(b);
    } else {
      aCount = getLostCount(a);
      bCount = getLostCount(b);
    }

    const orderAB = bCount - aCount;

    if (orderAB === 0) {
      return sortByName(a, b);
    }

    return orderAB;
  };

  const sortBySetsWon = (a, b) => sortBySets(true, a, b);
  const sortBySetsLost = (a, b) => sortBySets(false, a, b);

  $scope.sortPlayersBySetsWon = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    $scope.players.sort(sortBySetsWon);
  };

  $scope.sortPlayersBySetsLost = function () {
    console.log('button clicked');
    console.log('players count', $scope.players.length);

    $scope.players.sort(sortBySetsLost);
  };

  const getGamesCount = (won, player) => {
    let idx = 0;

    if (won === false) {
      idx = 1;
    }

    const info = player.Games.split('');
    const filt = info.filter(s => {
      return s !== ' ';
    });

    const newJoin = filt.join('');

    return Number(newJoin.split('-')[idx]);
  };

  const getGamesWon = player => getGamesCount(true, player);
  const getGamesLost = player => getGamesCount(false, player);

  const sortByGames = (won, a, b) => {
    let aGames = 0;
    let bGames = 0;

    if (won === true) {
      aGames = getGamesWon(a);
      bGames = getGamesWon(b);
    } else {
      aGames = getGamesLost(a);
      bGames = getGamesLost(b);
    }

    const gamesMatch = bGames - aGames;

    if (gamesMatch === 0) {
      return sortByName(a, b);
    }

    return gamesMatch;
  };

  const sortByGamesWon = (a, b) => sortByGames(true, a, b);
  const sortByGamesLost = (a, b) => sortByGames(false, a, b);

  $scope.sortPlayersByGamesWon = function () {
    console.log('button clicked - games won');
    console.log('players count', $scope.players.length);

    $scope.players.sort(sortByGamesWon);
  };

  $scope.sortPlayersByGamesLost = function () {
    console.log('button clicked - games lost');
    console.log('players count', $scope.players.length);

    $scope.players.sort(sortByGamesLost);
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
