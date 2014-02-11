/*global YUI */

YUI.add('sift-boards', function (Y) {

    "use strict";

    Y.namespace('siftBoards');

        board.filterForWinX = function (arrayOfBoards) {

            var winningXBoards;
            winningXBoards = Y.Array.filter(arrayOfBoards, this.checkGameWinForX, this);
            return winningXBoards;
        };

}, '0.0.1', { requires: [] });
