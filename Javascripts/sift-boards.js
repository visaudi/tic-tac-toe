/*global YUI */

YUI.add('sift-boards', function (Y) {

    "use strict";

    Y.namespace('siftBoards');

    Y.siftBoards.forWin = function (arrayOfBoards, winningToken) {
        return Y.Array.filter(arrayOfBoards, function (board) {
            return Y.checkBoard.forWin(board, winningToken);
        }, this);
    };

    Y.siftBoards.againstWin = function (arrayOfBoards, winningToken) {

        return Y.Array.filter(arrayOfBoards, function (board) {
            return !Y.checkBoard.forWin(board, winningToken);
        }, this);

    };

    Y.siftBoards.forNumberOfSpecificTokenOneToWinsPerBoard = function (gameBoard, numberOfOneToWinsPerBoardToFilterFor, specificToken) {

        return (Y.checkBoard.forOneToWin(gameBoard, specificToken) === numberOfOneToWinsPerBoardToFilterFor);

    };

    Y.siftBoards.forHighestOneToWin = function (arrayOfBoards, token) {

        var highestOneToWinBoards,
            highestNumberOfOneToWins,
            makeFilterForCurrentNumberOfOneToWinsPerBoard,
            filterForCurrentNumberOfOneToWinsPerBoard;

        highestOneToWinBoards = [];
        highestNumberOfOneToWins = 0;

        makeFilterForCurrentNumberOfOneToWinsPerBoard = function (numberOfOneToWinPerBoard) {
            return function (sameArrayOfBoards) {

                return Y.siftBoards.forNumberOfSpecificTokenOneToWinsPerBoard(sameArrayOfBoards, numberOfOneToWinPerBoard, token);

            };

        };

        do {
            highestNumberOfOneToWins += 1;

            filterForCurrentNumberOfOneToWinsPerBoard = makeFilterForCurrentNumberOfOneToWinsPerBoard(highestNumberOfOneToWins);
            highestOneToWinBoards.push(Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfOneToWinsPerBoard, this));
        } while ((highestOneToWinBoards[highestOneToWinBoards.length - 1]).length !== 0);

        highestOneToWinBoards.pop();

        if (highestOneToWinBoards.length !== 0) {
            highestOneToWinBoards = highestOneToWinBoards[highestOneToWinBoards.length - 1];
        }

        return highestOneToWinBoards;
    };

    Y.siftBoards.forNumberOfTwoToWins = function (gameBoard, numberOfTwoToWinsPerBoardToFilterFor, winningToken) {

        return (Y.checkBoard.forTwoToWin(gameBoard, winningToken) === numberOfTwoToWinsPerBoardToFilterFor);

    };

    Y.siftBoards.forHighestTwoToWins = function (arrayOfBoards, siftedToken) {

        var highestTwoToWinBoards,
            highestNumberOfTwoToWins,
            makeFilterForCurrentNumberOfTwoToWinsPerBoard,
            filterForCurrentNumberOfTwoToWinsPerBoard,
            twoToWinLevelState;

        highestTwoToWinBoards = [];
        highestNumberOfTwoToWins = 0;

        makeFilterForCurrentNumberOfTwoToWinsPerBoard = function (numberOfTwoToWinPerBoard) {
            return function (sameArrayOfBoards) {

                return Y.siftBoards.forNumberOfTwoToWins(sameArrayOfBoards, numberOfTwoToWinPerBoard, siftedToken);

            };

        };

        for (highestNumberOfTwoToWins = 1; highestNumberOfTwoToWins < 6; highestNumberOfTwoToWins += 1) {

            filterForCurrentNumberOfTwoToWinsPerBoard = makeFilterForCurrentNumberOfTwoToWinsPerBoard(highestNumberOfTwoToWins);

            twoToWinLevelState = Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard, this);

            if (twoToWinLevelState.length !== 0) {
                highestTwoToWinBoards.push(Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard, this));
            }

        }

        if (highestTwoToWinBoards.length !== 0) {
            highestTwoToWinBoards = highestTwoToWinBoards[highestTwoToWinBoards.length - 1];
        }
        return highestTwoToWinBoards;

    };

    Y.siftBoards.againstOneToWin = function (arrayOfBoards, undesirableToken) {
        var nonOneToWinXBoards;
        nonOneToWinXBoards = Y.Array.reject(arrayOfBoards, function (board) {

            return Y.checkBoard.forOneToWin(board, undesirableToken);

        }, this);
        return nonOneToWinXBoards;

    };

    Y.siftBoards.againstHighestTwoToWin = function (arrayOfBoards, undesirableToken, xRows) {

        var minimalTwoToWinBoards,
            filterForCurrentNumberOfTwoToWinsPerBoard,
            xRowDepth = xRows;

        if (xRowDepth === undefined) {
            xRowDepth = 0;
        }

        filterForCurrentNumberOfTwoToWinsPerBoard = (function () {

            return function (sameArrayOfBoards) {
                return Y.siftBoards.forNumberOfTwoToWins(sameArrayOfBoards, xRowDepth, undesirableToken);
            };

        }());

        minimalTwoToWinBoards = Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard);
        if ((minimalTwoToWinBoards.length === 0) &&  (xRowDepth !== 6)) {
            return Y.siftBoards.againstHighestTwoToWin(arrayOfBoards, undesirableToken, xRowDepth + 1);
        }
        return minimalTwoToWinBoards;


    };

    Y.siftBoards.againstOppositeCornerHazard = function (arrayOfBoards, aggressor, defender) {

        var oppositeCornerPlay = []; 

        oppositeCornerPlay.push(Y.Array.find(arrayOfBoards, function (gameBoard) {

            return Y.checkBoard.forOppositeCornerHazard(gameBoard, aggressor, defender);

        }));

        return oppositeCornerPlay;
        
    };

    Y.siftBoards.forStrongestBoard = function (gameBoard, playerStrengthened, playerUnderminded) {

                var littleResult, bigResult;

                bigResult = Y.projectBoard.forNextTurnPossibilities(gameBoard, playerStrengthened);

                littleResult = Y.siftBoards.forWin(bigResult, playerStrengthened);
                bigResult = littleResult.length ? littleResult : bigResult;


                littleResult = Y.siftBoards.againstWin(bigResult, playerUnderminded);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = Y.siftBoards.againstOneToWin(bigResult, playerUnderminded);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = Y.siftBoards.againstOppositeCornerHazard(bigResult, playerUnderminded, playerStrengthened);
                bigResult = littleResult[0] ? littleResult : bigResult;

                littleResult = Y.siftBoards.againstHighestTwoToWin(bigResult, playerUnderminded);
                bigResult = littleResult.length ? littleResult : bigResult;


                littleResult = Y.siftBoards.forHighestOneToWin(bigResult, playerStrengthened);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = Y.siftBoards.forHighestTwoToWins(bigResult, playerStrengthened);
                bigResult = littleResult.length ? littleResult : bigResult;


                return bigResult[0];

    };

}, '0.0.1', { requires: ['check-board'] });
