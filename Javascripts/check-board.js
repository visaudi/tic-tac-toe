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

    Y.checkBoard.forTwoToWin = function (gameBoard, winningToken) {
        var twoToWinOccurrences = 0;
        if ((Y.checkRow.tokenCount(Y.getStrand.column(0, gameBoard), winningToken) === 1) && (Y.checkRow.tokenCount(Y.getStrand.column(0, gameBoard), 'n') === 2)) {
            twoToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.column(1, gameBoard), winningToken) === 1) && (Y.checkRow.tokenCount(Y.getStrand.column(1, gameBoard), 'n') === 2)) {
            twoToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.column(2, gameBoard), winningToken) === 1) && (Y.checkRow.tokenCount(Y.getStrand.column(2, gameBoard), 'n') === 2)) {
            twoToWinOccurrences += 1;
        }
        if ((Y.checkRow.tokenCount(Y.getStrand.row(0, gameBoard), winningToken) === 1) && (Y.checkRow.tokenCount(Y.getStrand.row(0, gameBoard), 'n') === 2)) {
            twoToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.row(1, gameBoard), winningToken) === 1) && (Y.checkRow.tokenCount(Y.getStrand.row(1, gameBoard), 'n') === 2)) {
            twoToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.row(2, gameBoard), winningToken) === 1) && (Y.checkRow.tokenCount(Y.getStrand.row(2, gameBoard), 'n') === 2)) {
            twoToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.highLeftDiagonal(gameBoard), winningToken) === 1) && (Y.checkRow.tokenCount(Y.getStrand.highLeftDiagonal(gameBoard), 'n') === 2)) {
            twoToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.lowLeftDiagonal(gameBoard), winningToken) === 1) && (Y.checkRow.tokenCount(Y.getStrand.lowLeftDiagonal(gameBoard), 'n') === 2)) {
            twoToWinOccurrences += 1;
        }

        return twoToWinOccurrences;

    };


    Y.checkBoard.forOneToWin = function (gameBoard, winningToken) {
        var oneToWinOccurrences = 0;
        if ((Y.checkRow.tokenCount(Y.getStrand.column(0, gameBoard), winningToken) === 2) && (Y.checkRow.tokenCount(Y.getStrand.column(0, gameBoard), 'n') === 1)) {
            oneToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.column(1, gameBoard), winningToken) === 2) && (Y.checkRow.tokenCount(Y.getStrand.column(1, gameBoard), 'n') === 1)) {
            oneToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.column(2, gameBoard), winningToken) === 2) && (Y.checkRow.tokenCount(Y.getStrand.column(2, gameBoard), 'n') === 1)) {
            oneToWinOccurrences += 1;
        }
        if ((Y.checkRow.tokenCount(Y.getStrand.row(0, gameBoard), winningToken) === 2) && (Y.checkRow.tokenCount(Y.getStrand.row(0, gameBoard), 'n') === 1)) {
            oneToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.row(1, gameBoard), winningToken) === 2) && (Y.checkRow.tokenCount(Y.getStrand.row(1, gameBoard), 'n') === 1)) {
            oneToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.row(2, gameBoard), winningToken) === 2) && (Y.checkRow.tokenCount(Y.getStrand.row(2, gameBoard), 'n') === 1)) {
            oneToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.highLeftDiagonal(gameBoard), winningToken) === 2) && (Y.checkRow.tokenCount(Y.getStrand.highLeftDiagonal(gameBoard), 'n') === 1)) {
            oneToWinOccurrences += 1;
        }

        if ((Y.checkRow.tokenCount(Y.getStrand.lowLeftDiagonal(gameBoard), winningToken) === 2) && (Y.checkRow.tokenCount(Y.getStrand.lowLeftDiagonal(gameBoard), 'n') === 1)) {
            oneToWinOccurrences += 1;
        }

        return oneToWinOccurrences;
    };

}, '0.0.1', { requires: ['get-strand', 'check-row'] });
