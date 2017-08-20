/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0, padded-blocks: 0 */

function TableRowsES5Controller ($scope, $http, $sce) {

    $scope.players =
      angular.fromJson(
        [{Rank: '10', Name: 'xxJohn Kelly', Won: '1', Played: '9', Sets: '2 - 9', Games: '31 - 67'},
          {Rank: '11', Name: 'xxMike Milfull', Won: '1', Played: '9', Sets: '2 - 10', Games: '40 - 65'},
          {Rank: '12', Name: 'xxJohn Trotter', Won: '0', Played: '3', Sets: '1 - 3', Games: '10 - 22'}
        ]);

    const url = 'http://localhost:8080/players';
    const url2 = 'http://localhost:8080/players?callback=JSON_CALLBACK';

    const trustedUrl = $sce.trustAsResourceUrl(url);
    const trustedUrl2 = $sce.trustAsResourceUrl(url2);

    $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
    // $http.jsonp(url2)
    .then(data => {
      // console.log('trusted', trustedUrl);
      console.log('data', data);

      $scope.players = data.data;
    }, errResp => {
      // console.log('trusted', trustedUrl.unwrapTrustedValue());
      console.log('error', errResp);
    });
};

TableRowsES5Controller.$inject = ['$scope', '$http', '$sce'];

export const TableRowsFiveCtrl = TableRowsES5Controller;
