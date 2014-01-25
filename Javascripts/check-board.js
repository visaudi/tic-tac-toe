/*global YUI */

YUI.add('check-board', function (Y) {

    "use strict";

    Y.namespace('checkBoard');

    Y.checkBoard.possibleMoveLocations = function (gameBoard) {

        var possibilities = [], x, y;

        for (x = 0; x < 3; x += 1) {
            for (y = 0; y < 3; y += 1) {

                if (gameBoard[x][y] === 'n') {

                    possibilities.push([x, y]);

                }
            }
        }

        return possibilities;

    };

}, '0.0.1', { requires: [] });
