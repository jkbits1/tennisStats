/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0 */

function TablePlayersDirective () {
    return {
        restrict: 'E',
        template: [
            '<table class="table table-player" ng-show="players.length">',
                // '<thead>',
                //     '<tr>',
                //         '<th class="query-name">Name</th>',
                //         '<th class="query-status">Status</th>',
                //     '</tr>',
                // '</thead>',
                '<tbody>',
                    '<tr row-player ng-repeat="player in players track by $index"',
                             'player="player">',
                    '</tr>',
                '</tbody>',
            '</table>'
        ].join(''),
        scope: {
            players: '='
        },
        controller: function() {
        },
        link: function(scope, element) {
        }
    };
};

export const TablePlayers = TablePlayersDirective;
