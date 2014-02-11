/*global YUI */

YUI.add('check-row', function (Y) {

    "use strict";

    Y.namespace('checkRow');

    Y.checkRow.tokenCount = function (row, tokenType) {

        var square, tokenNumber  = 0;

        for (square = 0; square < row.length; square += 1) {
            if (row[square] === tokenType) {
                tokenNumber  += 1;
            }

        }

        return tokenNumber;

    };

}, '0.0.1', { requires: [] });
