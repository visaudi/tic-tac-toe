/*global YUI */

YUI.add('check-board-unit', function (Y) {

    "use strict";

    Y.namespace('checkBoardUnit');

    Y.checkBoardUnit.possibleMoveLocations = new Y.Test.Case({
        name: 'checkBoardUnit.possibleMoveLocations Unit Tests',

        'Array should have nine members that correspond to each of the nine x, y coordinates': function () {
            var board  = [['n', 'n', 'n'],
                          ['n', 'n', 'n'],
                          ['n', 'n', 'n']],

                literalListToEqual = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],

                result = Y.checkBoard.possibleMoveLocations(board),
                i,
                j;

            for (i = 0; i < literalListToEqual.length; i += 1) {
                for (j = 0; j < literalListToEqual[i].length; j += 1) {
                    Y.Assert.areSame(literalListToEqual[i][j], result[i][j]);
                }
            }
        }
    });

},
'0.0.1', { requires: ['test', 'check-board'] });
