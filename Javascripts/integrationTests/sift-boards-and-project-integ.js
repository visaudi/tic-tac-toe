/*global YUI */

YUI.add('sift-boards-and-project-integ', function (Y) {

    "use strict";

    Y.namespace('siftBoardsAndProjectInteg');

    Y.siftBoardsAndProjectInteg.forWin = new Y.Test.Case({
        name: 'siftBoards and projectBoard Integration Tests',

        'Possible board projections should show winning and losing boards': function () {

            var winningBoard, notWinningBoard, multiWinningBoard;

            winningBoard = [['x', 'x', 'n'],
                            ['n', 'o', 'n'],
                            ['n', 'o', 'n']];

            notWinningBoard = [['x', 'o', 'x'],
                               ['n', 'n', 'n'],
                               ['n', 'n', 'n']];


            multiWinningBoard = [['x', 'o', 'x'],
                                 ['x', 'x', 'n'],
                                 ['n', 'n', 'n']];

            Y.Assert.areSame(1, (Y.siftBoards.forWin(Y.projectBoard.forNextTurnPossibilities(winningBoard, 'x'), 'x')).length);
            Y.Assert.areSame(0, (Y.siftBoards.forWin(Y.projectBoard.forNextTurnPossibilities(notWinningBoard, 'x'), 'x')).length);
            Y.Assert.areSame(3, (Y.siftBoards.forWin(Y.projectBoard.forNextTurnPossibilities(multiWinningBoard, 'x'), 'x')).length);

        },

        'Y.siftBoards.forWin should take a list of boards and not return the ones where X is winning': function () {

            var winningBoardSeed,

            winningBoardSeed = [['o', 'x', 'n'],
                                ['n', 'x', 'n'],
                                ['o', 'n', 'o']];

            Y.Assert.areSame(3, (Y.siftBoards.againstWin(Y.projectBoard.forNextTurnPossibilities(winningBoardSeed, 'x'), 'x').length));

        },

        'filterAgainstWinForO should take a list of boards and not return the ones where X is winning': function () {

            var winningBoardSeed,

            winningBoardSeed = [['x', 'o', 'n'],
                                ['n', 'o', 'n'],
                                ['x', 'n', 'x']];

            Y.Assert.areSame(3, (Y.siftBoards.againstWin(Y.projectBoard.forNextTurnPossibilities(winningBoardSeed, 'o'), 'o').length));

        },

        'siftBoards.forHighestOneToWin should take an array of empty boards and return no boards at all': function () {

            var noOneToWins;

            noOneToWins = [['n', 'n', 'n'],
                           ['n', 'n', 'n'],
                           ['n', 'n', 'n']];


            Y.Assert.areSame(0, Y.siftBoards.forHighestOneToWin(Y.projectBoard.forNextTurnPossibilities(noOneToWins, 'x'), 'x').length);
        },

        'siftBoards.forHighestOneToWin should take an array of boards, some of the boards have one one to win row and return the boards which have on to win rows': function () {

            var oneOneToWinPerBoard;


            oneOneToWinPerBoard = [['x', 'n', 'n'],
                                   ['n', 'n', 'n'],
                                   ['n', 'o', 'o']];

            Y.Assert.areSame(4, Y.siftBoards.forHighestOneToWin(Y.projectBoard.forNextTurnPossibilities(oneOneToWinPerBoard, 'x'), 'x').length);

        },

        'siftBoards.forHighestOneToWin should take an array of boards, one of the boards has two rows with one two wins in each, it returns these boards': function () {

            var twoOneToWinsPerBoard;

            twoOneToWinsPerBoard = [['x', 'n', 'n'],
                                    ['n', 'o', 'n'],
                                    ['o', 'n', 'x']];

            Y.Assert.areSame(1, Y.siftBoards.forHighestOneToWin(Y.projectBoard.forNextTurnPossibilities(twoOneToWinsPerBoard, 'x'), 'x').length);
        },

        'Y.siftBoards.forHighestTwoToWins should take an array from an empty board and return one board': function () {

            var oneTwoToWin;

            oneTwoToWin = [['n', 'n', 'n'],
                           ['n', 'n', 'n'],
                           ['n', 'n', 'n']];


            Y.Assert.areSame(1, Y.siftBoards.forHighestTwoToWins(Y.projectBoard.forNextTurnPossibilities(oneTwoToWin, 'x'), 'x').length);
        },


        'Y.siftBoards.forHighestTwoToWins should take an array of boards, some of the boards have two one to win rows and return the boards which have one to win rows': function () {

            var fourTwoToWinFromBoard;


            fourTwoToWinFromBoard = [['n', 'n', 'n'],
                                     ['n', 'o', 'n'],
                                     ['n', 'n', 'n']];

            Y.Assert.areSame(4, Y.siftBoards.forHighestTwoToWins(Y.projectBoard.forNextTurnPossibilities(fourTwoToWinFromBoard, 'x'), 'x').length);

        },

        'Y.siftBoards.forHighestTwoToWins should take an array of boards, none of the boards has a two to win in it': function () {

            var noTwoToWinsPerBoard;

            noTwoToWinsPerBoard = [['x', 'n', 'x'],
                                   ['x', 'o', 'o'],
                                   ['o', 'o', 'x']];

            Y.Assert.areSame(0, Y.siftBoards.forHighestTwoToWins(Y.projectBoard.forNextTurnPossibilities(noTwoToWinsPerBoard, 'x'), 'x').length);
        },

        'filterAgainstOneToWinForX should take an array of empty boards and return what it was given': function () {


            var noOneToWins;

            noOneToWins = [['n', 'n', 'n'],
                           ['n', 'n', 'n'],
                           ['n', 'n', 'n']];


            Y.Assert.areSame(9, Y.siftBoards.againstOneToWin(Y.projectBoard.forNextTurnPossibilities(noOneToWins, 'x'), 'x').length);

        },

        'filterAgainstOneToWinForX should take an array of boards where some of the boards have one one to win row and return no boards with one to wins on them': function () {


            var oneOneToWinPerBoard;


            oneOneToWinPerBoard = [['x', 'n', 'n'],
                                   ['n', 'n', 'o'],
                                   ['n', 'n', 'n']];

            Y.Assert.areSame(1, Y.siftBoards.againstOneToWin(Y.projectBoard.forNextTurnPossibilities(oneOneToWinPerBoard, 'x'), 'x').length);

        },

            'Y.siftBoards.againstHighestTwoToWin should take an array of boards, two boards should keep the two to wins for x lowest': function () {

                var fourTwoToWinsPerBoard;

                fourTwoToWinsPerBoard = [['n', 'n', 'x'],
                                         ['n', 'o', 'n'],
                                         ['x', 'n', 'n']];

                Y.Assert.areSame(2, Y.siftBoards.againstHighestTwoToWin(Y.projectBoard.forNextTurnPossibilities(fourTwoToWinsPerBoard, 'x'), 'x').length);

            },

            'Y.siftBoards.againstHighestTwoToWin should take an array of boards, four boards should keep the two to wins for x lowest': function () {

                var nineTwoToWinProjection;

                nineTwoToWinProjection = [['n', 'n', 'n'],
                                          ['n', 'x', 'n'],
                                          ['n', 'n', 'n']];

                Y.Assert.areSame(4, Y.siftBoards.againstHighestTwoToWin(Y.projectBoard.forNextTurnPossibilities(nineTwoToWinProjection, 'x'), 'x').length);
            }

    });

}, '0.0.1', { requires: ['sift-boards', 'project-board'] });
