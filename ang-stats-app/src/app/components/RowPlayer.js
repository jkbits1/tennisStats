/* eslint comma-style: 0, indent: 0, no-unused-vars: 0, object-shorthand: 0, angular/log: 0, no-extra-semi: 0, space-before-function-paren: 0 */

function RowPlayerDirective () {
    return {
        restrict: 'A',
        template: require('./RowPlayer.html'),

        // template: [
        //     // '<tr class="player query-status-{{query.status}}">',
        //     '<tr class="player">',
        //         '<td>{{ player.name }}</td>',
        //         // '<td>{{ query.status | uppercase }}</td>',
        //     '</tr>'
        // ].join(''),
        scope: {
            player: '='
        },
        replace: true
    };
};

export const RowPlayer = RowPlayerDirective;
