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

    Y.squareRowTools.checkForMixedRow = function (row) {

        var mixed = false;
        if ((Y.checkRow.tokenCount(row, 'x') > 0) && (Y.checkRow.tokenCount(row, 'o') > 0)) {
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

}, '0.0.1', { requires: ['get-strand', 'check-row'] });
