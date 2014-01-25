/*global YUI */

YUI.add('get-strand', function (Y) {

    "use strict";

    Y.namespace('getStrand');

    Y.getStrand.column = function (columnPosition, gameBoard) {

        var x, column = [];

        for (x = 0; x < gameBoard.length; x += 1) {

            column[x] = gameBoard[x][columnPosition];
        }

        return column;
    };

    Y.getStrand.row = function (rowPosition, gameBoard) {

        var y, extractedRow = [];

        for (y = 0; y < gameBoard[rowPosition].length; y += 1) {

            extractedRow[y] = gameBoard[rowPosition][y];

        }

        return extractedRow;

    };

    Y.getStrand.highLeftDiagonal = function (gameBoard, startingPoint) {

        var xAndY, diagonal = [];

        if (startingPoint !== 0) {

            startingPoint = 0;

        }

        if (gameBoard.length >= gameBoard[0].length) {

            if (startingPoint >= gameBoard[0].length) {

                startingPoint = startingPoint % gameBoard[0].length;

            }

            for (xAndY = 0; xAndY < (gameBoard[0].length - startingPoint); xAndY += 1) {

                diagonal[xAndY] = gameBoard[startingPoint + xAndY][startingPoint + xAndY];
            }

        } else {

            if (startingPoint >= gameBoard.length) {

                startingPoint = startingPoint % gameBoard.length;

            }

            for (xAndY = 0; xAndY < (gameBoard.length - startingPoint); xAndY += 1) {

                diagonal[xAndY] = gameBoard[startingPoint + xAndY][startingPoint + xAndY];

            }
        }

        return diagonal;
    };

    Y.getStrand.lowLeftDiagonal = function (gameBoard) {

        var x, y = 2, diagonal = [];


        for (x = 0; x < 3; x += 1) {
            diagonal[x] = gameBoard[y][x];

            y -= 1;

        }

        return diagonal;

    };

}, '0.0.1', { requires: [] });
