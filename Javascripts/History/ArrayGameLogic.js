//This function returns an array of possible squares that the artificial intelligence may
//move.  x and y are the horizontal and vertical axis' of the board.
TTT.possibleMoveLocations = function (array) {
    "use strict";
    var possibilities = [], x, y;

    for (x = 0; x < 3; x += 1) {
        for (y = 0; y < 3; y += 1) {

            if (array[x][y] === 'n') {

                possibilities.push([x, y]);


            }
        }

    }

    return possibilities;

};

//Extracts the top left to bottom right cross of the board and makes it into an array of three
//Possibly change name to getNorthWestToSouthEastDiagonal()
TTT.getHighLeftDiagonal = function (board) {

    "use strict";

    //xy is the combination of the horizontal and vertical axis' on the board.
    //In this application, they are always the same number at the same time.
    var xy, diagonal = [];

    //I use 3, but it's to save time.
    for (xy = 0; xy < 3; xy += 1) {


        diagonal[xy] = board[xy][xy];

    }

    return diagonal;

};


//Extracts the bottom left to top right cross of the board and makes it into an array of three
//Possibly change name to getSouthWestToNorthEastDiagonal()
TTT.getLowLeftDiagonal = function (board) {

    "use strict";

    //As in the rest of the whole application, x and y are the horizontal and vertical axis'.
    var x, y = 2, diagonal = [];


    for (x = 0; x < 3; x += 1) {

        //X is for my one dimensional row as well as my two dimensional board.
        diagonal[x] = board[y][x];

        y -= 1;

    }

    return diagonal;

};

//Extracts one the three rows of the board and makes it into an array of three.
//rowPosition is which of the three rows we choose.
TTT.getRow = function (board, rowPosition) {

    "use strict";

    var y, extractedRow = [];

    //I use 3, but it's to save time.
    for (y = 0; y < 3; y += 1) {

        extractedRow[y] = board[rowPosition][y];


    }

    return extractedRow;

};

//Extracts one the three columns of the board and makes it into an array of three
TTT.getColumn = function (board, columnPosition) {

    "use strict";

    var x, column = [];

    //I use 3, but it's to save time.
    for (x = 0; x < 3; x += 1) {

        column[x] = board[x][columnPosition];


    }

    return column;


};

//Checks if any array of three items or a Tic Tac Toe "row" has a loss for X
TTT.rowLossCheck = function (row) {

    "use strict";

    var square, loss = true;
    for (square = 0; square < row.length; square += 1) {
        if (row[square] !== 'o') {
            loss = false;


        }

    }

    return loss;

};

//Checks if any array of three items or a Tic Tac Toe "row" has a wins for X
TTT.rowWinCheck = function (row) {

    "use strict";

    var win = false;
    if ((row[0] === 'x') && (row[1] === 'x') && (row[2] === 'x')) {
        win = true;

    }

    return win;

};

//Checks if a game is lost by X
TTT.gameLossCheck = function (board) {

    "use strict";


    var loss = false;
    if (TTT.rowLossCheck(TTT.getColumn(board, 0)) || TTT.rowLossCheck(TTT.getColumn(board, 1)) || TTT.rowLossCheck(TTT.getColumn(board, 2)) || TTT.rowLossCheck(TTT.getRow(board, 0)) || TTT.rowLossCheck(TTT.getRow(board, 1)) || TTT.rowLossCheck(TTT.getRow(board, 2)) || TTT.rowLossCheck(TTT.getHighLeftDiagonal(board)) || TTT.rowLossCheck(TTT.getLowLeftDiagonal(board))) {
        loss = true;

    }

    return loss;

};

//Checks if a game is lost by X
TTT.gameWinCheck = function (board) {

    "use strict";


    var win = false;
    if (TTT.rowWinCheck(TTT.getColumn(board, 0)) || TTT.rowWinCheck(TTT.getColumn(board, 1)) || TTT.rowWinCheck(TTT.getColumn(board, 2)) || TTT.rowWinCheck(TTT.getRow(board, 0)) || TTT.rowWinCheck(TTT.getRow(board, 1)) || TTT.rowWinCheck(TTT.getRow(board, 2)) || TTT.rowWinCheck(TTT.getHighLeftDiagonal(board)) || TTT.rowWinCheck(TTT.getLowLeftDiagonal(board))) {
        win = true;

    }

    return win;

};

//Checks for a tie game and takes a tic tac toe board boarday.
TTT.gameTieCheck = function (board) {

    "use strict";

    var tie = false;

    if (!this.gameWinCheck(board) && !this.gameLossCheck(board) && (TTT.possibleMoveLocations(board).length === 0)) {

        tie = true;

    }

    return tie;

};

