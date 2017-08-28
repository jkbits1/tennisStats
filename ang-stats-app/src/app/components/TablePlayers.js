/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0 */

// following pattern in first answer.
// second answer is good on dom manips
// https://stackoverflow.com/questions/27448789/angularjs-nested-directives-are-inserted-outside-their-supposed-parent-element
// https://stackoverflow.com/questions/15362868/adding-rows-with-ng-repeat-and-nested-loop

function TablePlayersController ($scope) {
  console.log('table player scope', $scope);

// convert to symbols
  $scope.RANK_IDX = 0;
  $scope.NAME_IDX = 1;
  $scope.WINS_IDX = 2;
  $scope.GAME_IDX = 3;
  $scope.PART_IDX = 4;
  $scope.SETS_IDX = 5;

  $scope.sorted = [false, false, false, false, false, false];
  $scope.ascend = [false, false, false, false, false, false];

  // $scope.playedAsc = false;
  // $scope.winsAsc = false;
  // $scope.setsWonAsc = false;
  // $scope.gamesWonAsc = false;

  const resetFlags = curIdx => {
    $scope.sorted = $scope.sorted.map(() => {
      return false;
    });

    $scope.ascend = $scope.ascend.map((val, idx) => {
      if (curIdx === idx) {
        return val;
      }

      return false;
    });
  };

  resetFlags(100);

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

  const sortByWins = (a, b) => {
    let orderValue = -1;

    if ($scope.ascend[$scope.WINS_IDX] === true) {
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

    if ($scope.ascend[$scope.PART_IDX] === true) {
      orderValue = 1;
    }

    const playedMatch = (b.Played - a.Played) * orderValue;

    if (playedMatch === 0) {
      return sortByName(a, b);
    }

    return playedMatch;
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
      if ($scope.ascend[$scope.SETS_IDX]) {
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
      if ($scope.ascend[$scope.GAME_IDX] === true) {
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

  const sortByFunction = (sortFn, sortIdx) => () => {
    resetFlags(sortIdx);

    $scope.sorted[sortIdx] = true;
    $scope.ascend[sortIdx] = !$scope.ascend[sortIdx];

    $scope.players.sort(sortFn);
  };

  $scope.sortPlayersByName = sortByFunction(sortByName, $scope.NAME_IDX);
  $scope.sortPlayersByRank = sortByFunction(sortByRank, $scope.RANK_IDX);
  $scope.sortPlayersByWins = sortByFunction(sortByWins, $scope.WINS_IDX);
  $scope.sortPlayersByParticipation = sortByFunction(sortByParticipation, $scope.PART_IDX);
  $scope.sortPlayersBySetsWon = sortByFunction(sortBySetsWon, $scope.SETS_IDX);
  $scope.sortPlayersByGamesWon = sortByFunction(sortByGamesWon, $scope.GAME_IDX);

  // $scope.sortPlayersByName = function () {
  //   sortByName2();
  // };

  // $scope.sortPlayersByRank = function () {
  //   sortByRank2();
  // };

  // $scope.sortPlayersByWins = function () {
  //   sortByWins2();
  // };

  // $scope.sortPlayersByParticipation = function () {
  //   sortByParticipation2($scope.players);
  // };

  // $scope.sortPlayersBySetsWon = function () {
  //   sortBySetsWon2($scope.players);
  // };

  // $scope.sortPlayersByGamesWon = function () {
  //   sortByGamesWon2($scope.players);
  // };

  $scope.sortPlayersBySetsLost = function () {
    $scope.players.sort(sortBySetsLost);
  };

  $scope.sortPlayersByGamesLost = function () {
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
