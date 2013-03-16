var ticTacToe = function () {

    "use strict";

    var possibleMoveLocations = function (board) {

        var possibilities = [], x, y;

        for (x = 0; x < 3; x += 1) {
            for (y = 0; y < 3; y += 1) {

                if (board[x][y] === 'n') {

                    possibilities.push([x, y]);


                }
            }
        }

        return possibilities;

    },

        getHighLeftDiagonal = function (board) {

            var xAndY, diagonal = [];

            for (xAndY = 0; xAndY < 3; xAndY += 1) {

                diagonal[xAndY] = board[xAndY][xAndY];

            }

            return diagonal;

        },


        getLowLeftDiagonal = function (board) {

            var x, y = 2, diagonal = [];


            for (x = 0; x < 3; x += 1) {
                diagonal[x] = board[y][x];

                y -= 1;

            }

            return diagonal;

        },

        getRow = function (board, rowPosition) {

            var y, extractedRow = [];

            for (y = 0; y < 3; y += 1) {

                extractedRow[y] = board[rowPosition][y];


            }

            return extractedRow;

        },

        getColumn = function (board, columnPosition) {

            var x, column = [];

            for (x = 0; x < 3; x += 1) {

                column[x] = board[x][columnPosition];


            }

            return column;


        },

        rowLossCheck = function (row) {

            var square, loss = true;

            for (square = 0; square < row.length; square += 1) {
                if (row[square] !== 'o') {
                    loss = false;
                }

            }

            return loss;

        },

        rowWinCheck = function (row) {

            var win = false;
            if ((row[0] === 'x') && (row[1] === 'x') && (row[2] === 'x')) {
                win = true;

            }

            return win;

        },

        gameLossCheck = function (board) {

            var loss = false;
            if (rowLossCheck(getColumn(board, 0)) || rowLossCheck(getColumn(board, 1)) || rowLossCheck(getColumn(board, 2)) || rowLossCheck(getRow(board, 0)) || rowLossCheck(getRow(board, 1)) || rowLossCheck(getRow(board, 2)) || rowLossCheck(getHighLeftDiagonal(board)) || rowLossCheck(getLowLeftDiagonal(board))) {
                loss = true;

            }

            return loss;
        },

        gameWinCheck = function (board) {

            var win = false;
            if (rowWinCheck(getColumn(board, 0)) || rowWinCheck(getColumn(board, 1)) || rowWinCheck(getColumn(board, 2)) || rowWinCheck(getRow(board, 0)) || rowWinCheck(getRow(board, 1)) || rowWinCheck(getRow(board, 2)) || rowWinCheck(getHighLeftDiagonal(board)) || rowWinCheck(getLowLeftDiagonal(board))) {
                win = true;

            }

            return win;

        },

        gameTieCheck = function (board) {

            var tie = false;

            if (gameWinCheck(board) && gameLossCheck(board) && (possibleMoveLocations(board).length === 0)) {

                tie = true;

            }

            return tie;

        };


};