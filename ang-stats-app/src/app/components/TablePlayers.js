/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0 */

// following pattern in first answer.
// second answer is good on dom manips
// https://stackoverflow.com/questions/27448789/angularjs-nested-directives-are-inserted-outside-their-supposed-parent-element
// https://stackoverflow.com/questions/15362868/adding-rows-with-ng-repeat-and-nested-loop

function TablePlayersController ($scope) {
  console.log('table player scope', $scope);

  $scope.playedAsc = false;
  $scope.winsAsc = false;
  $scope.setsWonAsc = false;
  $scope.gamesWonAsc = false;

  const resetSortFlags = () => {
    $scope.rankSorted = false;
    $scope.nameSorted = false;
    $scope.winsSorted = false;
    $scope.gamesSorted = false;
    $scope.setsSorted = false;
    $scope.playedSorted = false;
  };

  resetSortFlags();

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

  const sortByRank = (a, b) => {
      return a.Rank - b.Rank;
  };

  const sortByNameOrRank = sortFn => players => {
    players.sort(sortFn);
  };

  const sortByWins = (a, b) => {
    let orderValue = -1;

    if ($scope.winsAsc === true) {
      orderValue = 1;
    }

    const wonMatch = (b.Won - a.Won) * orderValue;

    if (wonMatch === 0) {
      return sortByName(a, b);
    }

    return wonMatch;
  };

  const sortByParticipation = (a, b) => {
    let orderValue = -1;

    if ($scope.playedAsc === true) {
      orderValue = 1;
    }

    const playedMatch = (b.Played - a.Played) * orderValue;

    if (playedMatch === 0) {
      return sortByName(a, b);
    }

    return playedMatch;
  };

  const sortByName2 = sortByNameOrRank(sortByName);
  const sortByRank2 = sortByNameOrRank(sortByRank);
  const sortByWins2 = sortByNameOrRank(sortByWins);
  const sortByParticipation2 = sortByNameOrRank(sortByParticipation);

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
      if ($scope.setsWonAsc) {
        aCount = getWonCount(a);
        bCount = getWonCount(b);
      } else {
        bCount = getWonCount(a);
        aCount = getWonCount(b);
      }
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

  $scope.sortPlayersByName = function () {
    resetSortFlags();
    $scope.nameSorted = true;

    sortByName2($scope.players);
  };

  $scope.sortPlayersByRank = function () {
    resetSortFlags();
    $scope.rankSorted = true;

    sortByRank2($scope.players);
  };

  $scope.sortPlayersByWins = function () {
    resetSortFlags();
    $scope.winsSorted = true;

    $scope.winsAsc = !$scope.winsAsc;

    sortByWins2($scope.players);
  };

  $scope.sortPlayersByParticipation = function () {
    resetSortFlags();
    $scope.playedSorted = true;

    $scope.playedAsc = !$scope.playedAsc;

    sortByParticipation2($scope.players);
  };

  $scope.sortPlayersBySetsWon = function () {
    $scope.setsWonAsc = !$scope.setsWonAsc;

    resetSortFlags();
    $scope.setsSorted = true;

    $scope.players.sort(sortBySetsWon);
  };

  $scope.sortPlayersBySetsLost = function () {
    resetSortFlags();
    $scope.setsSorted = true;

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
      if ($scope.gamesWonAsc === true) {
        aGames = getGamesWon(a);
        bGames = getGamesWon(b);
      } else {
        bGames = getGamesWon(a);
        aGames = getGamesWon(b);
      }
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
    $scope.gamesWonAsc = !$scope.gamesWonAsc;

    resetSortFlags();
    $scope.gamesSorted = true;

    $scope.players.sort(sortByGamesWon);
  };

  $scope.sortPlayersByGamesLost = function () {
    resetSortFlags();
    $scope.gamesSorted = true;

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
