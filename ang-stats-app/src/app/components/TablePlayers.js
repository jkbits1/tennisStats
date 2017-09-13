/* eslint linebreak-style: 0, comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, angular/definedundefined: 0, no-negated-condition: 0 */

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
  $scope.GAMES_WON_IDX = 3;
  $scope.GAMES_LOST_IDX = 4;
  $scope.PART_IDX = 5;
  $scope.SETS_WON_IDX = 6;
  $scope.SETS_LOST_IDX = 7;

  $scope.sorted = [false, false, false, false, false, false, false, false];
  $scope.ascend = [true, false, false, false, false, false, false, false];

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

  const sortByNameAsc = (a, b) => {
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

  const sortByGeneric = (fn, idx) => (a, b) => {
    let orderValue = -1;

    if ($scope.ascend[idx] === true) {
      orderValue = 1;
    }

    const playedMatch = (fn(a, b)) * orderValue;

    if (playedMatch === 0) {
      return sortByNameAsc(a, b);
    }

    return playedMatch;
  };

  const getSetsCount = (won, player) => {
    // let idx = 0;

    if (won === true) {
      return player.SetsWon;
    }

    return player.SetsLost;

    // if (won === false) {
    //   idx = 1;
    // }

    // const info = player.Sets.split('');
    // const filt = info.filter(s => {
    //   return s !== ' ';
    // });
    // const newJoin = filt.join('');

    // return Number(newJoin.split('-')[idx]);
  };

  const getGamesCount = (won, player) => {
    // let idx = 0;

    if (won === true) {
      return player.GamesWon;
    }

    return player.GamesLost;

    // if (won === false) {
    //   idx = 1;
    // }

    // const info = player.Games.split('');
    // const filt = info.filter(s => {
    //   return s !== ' ';
    // });

    // const newJoin = filt.join('');

    // return Number(newJoin.split('-')[idx]);
  };

  const getWonCount = player => getSetsCount(true, player);
  const getLostCount = player => getSetsCount(false, player);

  const getGamesWon = player => getGamesCount(true, player);
  const getGamesLost = player => getGamesCount(false, player);

  const sortByName = sortByGeneric((a, b) => {
    const nameA = a.Name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.Name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  }, $scope.NAME_IDX);

  const sortByRank = sortByGeneric((a, b) => {
    return a.Rank - b.Rank;
  }, $scope.RANK_IDX);

  const sortByParticipation = sortByGeneric((a, b) => {
    return b.Played - a.Played;
  }, $scope.PART_IDX);

  const sortByWins = sortByGeneric((a, b) => {
    return b.Won - a.Won;
  }, $scope.WINS_IDX);

  const sortBySets = (countFn, idx, a, b) => {
    const aCount = countFn(a);
    const bCount = countFn(b);

    let playerA = 0;
    let playerB = 0;

    if ($scope.ascend[idx] === true) {
      playerA = aCount;
      playerB = bCount;
    } else {
      playerB = aCount;
      playerA = bCount;
    }

    const orderAB = playerB - playerA;

    if (orderAB === 0) {
      return sortByNameAsc(a, b);
    }

    return orderAB;
  };

  const sortBySetsWon = (a, b) => sortBySets(getWonCount, $scope.SETS_WON_IDX, a, b);
  const sortBySetsLost = (a, b) => sortBySets(getLostCount, $scope.SETS_LOST_IDX, a, b);

  const sortByGamesWon = (a, b) => sortBySets(getGamesWon, $scope.GAMES_WON_IDX, a, b);
  const sortByGamesLost = (a, b) => sortBySets(getGamesLost, $scope.GAMES_LOST_IDX, a, b);

  const sortByFunction = (sortFn, sortIdx) => () => {
    resetFlags(sortIdx);

    $scope.sorted[sortIdx] = true;
    $scope.ascend[sortIdx] = !$scope.ascend[sortIdx];

    if ($scope.players !== undefined) {
      $scope.players.sort(sortFn);
    } else {
      console.log('table players undefined', $scope.players);
    }
  };

  $scope.sortPlayersByName = sortByFunction(sortByName, $scope.NAME_IDX);
  $scope.sortPlayersByRank = sortByFunction(sortByRank, $scope.RANK_IDX);
  $scope.sortPlayersByWins = sortByFunction(sortByWins, $scope.WINS_IDX);
  $scope.sortPlayersByParticipation = sortByFunction(sortByParticipation, $scope.PART_IDX);
  $scope.sortPlayersBySetsWon = sortByFunction(sortBySetsWon, $scope.SETS_WON_IDX);
  $scope.sortPlayersBySetsLost = sortByFunction(sortBySetsLost, $scope.SETS_LOST_IDX);
  $scope.sortPlayersByGamesWon = sortByFunction(sortByGamesWon, $scope.GAMES_WON_IDX);
  $scope.sortPlayersByGamesLost = sortByFunction(sortByGamesLost, $scope.GAMES_LOST_IDX);

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

  // $scope.sortPlayersBySetsLost = function () {
  //   $scope.players.sort(sortBySetsLost);
  // };

  // $scope.sortPlayersByGamesLost = function () {
  //   $scope.players.sort(sortByGamesLost);
  // };

  $scope.$watch('players', (newValue, oldValue) => {
    if (newValue) {
      console.log('data change');

      $scope.ascend[0] = false;

      // $scope.teamname = '132';

      $scope.sortPlayersByRank();
    }
  },
  // true
  false
  );
}

TablePlayersController.$inject = ['$scope'];

function TablePlayersDirective () {
    return {
        restrict: 'E',
        template: require('./TablePlayers.html'),
        scope: {
            players: '<',
            teamname: '<',
            teamlink: '<'
        },
        controller: TablePlayersController,
        link: function(scope, element) {
          console.log('elem', element);

          // scope.$watch('players', (newValue, oldValue) => {
          //   if (newValue) {
          //     console.log('data change');
          //   }
          // },
          // // true
          // false
          // );
        }
    };
};

export const TablePlayers = TablePlayersDirective;
