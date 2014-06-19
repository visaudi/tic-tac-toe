/*global YUI */

YUI.add('sift-boards-unit', function (Y) {

    "use strict";

    Y.namespace('siftBoardsUnit');

    Y.siftBoardsUnit.forWin = new Y.Test.Case({
        name: 'siftBoardsUnit.forWin Unit Tests',

        'Function should take an Array of boards and return an array of the boards where x is winning': function () {

            var winningBoard,
                notWinningBoard,
                multiWinningBoard;

            winningBoard = [[['x', 'x', 'x'],
                             ['n', 'o', 'n'],
                             ['n', 'o', 'n']],

                            [['x', 'x', 'n'],
                            ['n', 'o', 'x'],
                            ['n', 'o', 'n']]];


            notWinningBoard = [[['x', 'o', 'x'],
                                ['n', 'n', 'n'],
                                ['n', 'n', 'n']],

                               [['x', 'o', 'n'],
                                ['n', 'x', 'n'],
                                ['n', 'n', 'n']]];


            multiWinningBoard = [[['x', 'o', 'x'],
                                  ['x', 'x', 'n'],
                                  ['x', 'n', 'n']],

                                 [['x', 'o', 'x'],
                                  ['x', 'x', 'x'],
                                  ['n', 'n', 'n']],

                                 [['x', 'o', 'x'],
                                  ['x', 'x', 'n'],
                                  ['n', 'n', 'x']],

                                 [['x', 'o', 'x'],
                                  ['x', 'x', 'n'],
                                  ['n', 'x', 'n']]];


            Y.Assert.areSame(1, (Y.siftBoards.forWin(winningBoard, 'x')).length);
            Y.Assert.areSame(0, (Y.siftBoards.forWin(notWinningBoard, 'x')).length);
            Y.Assert.areSame(3, (Y.siftBoards.forWin(multiWinningBoard, 'x')).length);

        }
    });


    Y.siftBoardsUnit.againstHighestTwoToWin = new Y.Test.Case({

        name: 'Y.siftBoardsUnit.againstHighestTwoToWin',

        'Function againstHighestTwoToWin should take an array of 8 boards 4 of which have two to wins at a level lower than the rest and return them': function () {

            var eightBoardsWithOneTwoToWin;

            eightBoardsWithOneTwoToWin = [[['x', 'n', 'n'],
                                           ['n', 'x', 'n'],
                                           ['n', 'n', 'n']],

                                          [['n', 'x', 'n'],
                                           ['n', 'x', 'n'],
                                           ['n', 'n', 'n']],

                                          [['n', 'n', 'x'],
                                           ['n', 'x', 'n'],
                                           ['n', 'n', 'n']],

                                          [['n', 'n', 'n'],
                                           ['x', 'x', 'n'],
                                           ['n', 'n', 'n']],

                                          [['n', 'n', 'n'],
                                           ['n', 'x', 'x'],
                                           ['n', 'n', 'n']],

                                          [['n', 'n', 'n'],
                                           ['n', 'x', 'n'],
                                           ['x', 'n', 'n']],

                                          [['n', 'n', 'n'],
                                           ['n', 'x', 'n'],
                                           ['n', 'x', 'n']],

                                          [['n', 'n', 'n'],
                                           ['n', 'x', 'n'],
                                           ['n', 'n', 'x']]];

                Y.Assert.areSame(4, (Y.siftBoards.againstHighestTwoToWin(eightBoardsWithOneTwoToWin, 'x').length));

        }

    });

}, '0.0.1', { requires: ['test', 'sift-boards', 'project-board'] });
