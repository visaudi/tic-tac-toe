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

    Y.checkBoard.forWin = function (gameBoard, winningToken) {
        var win = false;
        if ((Y.checkRow.tokenCount(Y.getStrand.column(0, gameBoard), winningToken) === 3) ||
            (Y.checkRow.tokenCount(Y.getStrand.column(1, gameBoard), winningToken) === 3) ||
            (Y.checkRow.tokenCount(Y.getStrand.column(2, gameBoard), winningToken) === 3) ||
            (Y.checkRow.tokenCount(Y.getStrand.row(0, gameBoard), winningToken) === 3) ||
            (Y.checkRow.tokenCount(Y.getStrand.row(1, gameBoard), winningToken) === 3) ||
            (Y.checkRow.tokenCount(Y.getStrand.row(2, gameBoard), winningToken) === 3) ||
            (Y.checkRow.tokenCount(Y.getStrand.highLeftDiagonal(gameBoard), winningToken) === 3) ||
            (Y.checkRow.tokenCount(Y.getStrand.lowLeftDiagonal(gameBoard), winningToken) === 3)) {
                win = true;
        }

        return win;
    };

}, '0.0.1', { requires: ['get-strand'] });
