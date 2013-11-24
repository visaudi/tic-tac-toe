/*global YUI */

YUI.add('square-row-tools', function (Y) {

    "use strict";

    Y.namespace('squareRowTools');


    Y.squareRowTools.getLine = function (gameBoard, axis, position) {

        var axisMarker = 0, axisSlice;

        if(axis === '-') {
            axisSlice = ['n', 'n', 'n'];
        } else {
            axisSlice = ['n', 'n', 'x'];
        }
        return axisSlice;
    };

    Y.squareRowTools.getBoardLineLength = function () {

        return 0;

    };

    Y.squareRowTools.getColumn = function (columnPosition, gameBoard) {

        var x, column = [];

        for (x = 0; x < gameBoard.length; x += 1) {

            column[x] = gameBoard[x][columnPosition];

        }

        return column;

    };

    Y.squareRowTools.getRow = function (rowPosition, gameBoard) {

        var y, extractedRow = [];

        for (y = 0; y < gameBoard[rowPosition].length; y += 1) {

            extractedRow[y] = gameBoard[rowPosition][y];

        }

        return extractedRow;

    };

    Y.squareRowTools.getHighLeftDiagonal = function (gameBoard, startingPoint) {

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

    Y.squareRowTools.getLowLeftDiagonal = function (gameBoard) {

        var x, y = 2, diagonal = [];


        for (x = 0; x < 3; x += 1) {
            diagonal[x] = gameBoard[y][x];

            y -= 1;

        }

        return diagonal;

    };

    Y.squareRowTools.rowOCount = function (row) {

        var square, oNumber  = 0;

        for (square = 0; square < row.length; square += 1) {
            if (row[square] === 'o') {
                oNumber  += 1;
            }

        }

        return oNumber;

    };

    Y.squareRowTools.rowXCount = function (row) {

        var square, xNumber  = 0;

        for (square = 0; square < row.length; square += 1) {
            if (row[square] === 'x') {
                xNumber  += 1;
            }

        }

        return xNumber;

    };

    Y.squareRowTools.checkForMixedRow = function (row) {

        var mixed = false;
        if ((Y.squareRowTools.rowXCount(row) > 0) && (Y.squareRowTools.rowOCount(row) > 0)) {
            mixed = true;
        }

        return mixed;

    };

    Y.squareRowTools.checkGameTie = function (gameBoard) {

        var tie = false;
        if ((Y.squareRowTools.checkForMixedRow(Y.squareRowTools.getColumn(0, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.squareRowTools.getColumn(1, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.squareRowTools.getColumn(2, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.squareRowTools.getRow(0, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.squareRowTools.getRow(1, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.squareRowTools.getRow(2, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.squareRowTools.getHighLeftDiagonal(gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.squareRowTools.getLowLeftDiagonal(gameBoard)))) {
            tie = true;
        }

        return tie;

    };

    Y.squareRowTools.possibleMoveLocations = function (gameBoard) {

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
