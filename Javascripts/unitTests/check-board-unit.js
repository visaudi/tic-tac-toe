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

    Y.checkBoardUnit.forOppositeCornerHazard = new Y.Test.Case({

        name: 'checkBoardUnit.forOppositeCornerHazard',

        'checkBoard.forOppositeCornerHazard should take a board with an x move in the top left corner, an o move in the center, an x move in the opposite corner and return true, when middle of the top is an o move and there are five turns left in the game': function () {


                var doubleCornerXBoard;

                doubleCornerXBoard = [['x', 'o', 'n'],
                                      ['n', 'o', 'n'],
                                      ['n', 'n', 'x']];

                Y.Assert.areSame(true, Y.checkBoard.forOppositeCornerHazard(doubleCornerXBoard, 'x', 'o'));
            },

            'checkBoard.forOppositeCornerHazard should take a board with an x move in the top right corner and in the opposite corner and return true when an o move is on the right side of the middle row and there are five turns left in the game': function () {

                var doubleCornerXBoard;

                doubleCornerXBoard = [['n', 'n', 'x'],
                                      ['n', 'o', 'o'],
                                      ['x', 'n', 'n']];

                Y.Assert.areSame(true, Y.checkBoard.forOppositeCornerHazard(doubleCornerXBoard, 'x', 'o'));

            },

            'checkBoard.forOppositeCornerHazard should take a board with an x move in the top left corner, an o move in the center, an x move in the opposite corner and return true, when the left of the middle row is an o move and there are five turns left in the game': function () {


                var doubleCornerXBoard;

                doubleCornerXBoard = [['x', 'n', 'n'],
                                      ['o', 'o', 'n'],
                                      ['n', 'n', 'x']];

                Y.Assert.areSame(true, Y.checkBoard.forOppositeCornerHazard(doubleCornerXBoard, 'x', 'o'));
            }

    });

}, '0.0.1', { requires: ['test', 'check-board'] });
