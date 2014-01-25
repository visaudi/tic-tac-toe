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
        if ((Y.squareRowTools.checkForMixedRow(Y.getStrand.column(0, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.getStrand.column(1, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.getStrand.column(2, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.getStrand.row(0, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.getStrand.row(1, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.getStrand.row(2, gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.getStrand.highLeftDiagonal(gameBoard))) &&
                (Y.squareRowTools.checkForMixedRow(Y.getStrand.lowLeftDiagonal(gameBoard)))) {
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

}, '0.0.1', { requires: ['get-strand'] });
