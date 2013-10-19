/*global YUI */

YUI.add('square-row-tools', function (Y) {

    "use strict";

    Y.namespace('squareRowTools');

    Y.squareRowTools.getColumn = function (columnPosition, gameBoard) {

        var x, column = [];

        for (x = 0; x < 3; x += 1) {

            column[x] = gameBoard[x][columnPosition];


        }

        return column;


    };


}, '0.0.1', { requires: [] });
