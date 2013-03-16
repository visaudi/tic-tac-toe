var squares = [['x', 'n', 'n'], ['x', 'x', 'o'], ['x', 'n', 'x']], lastTurner = 'o';

//Copy Array - Copies any array
function copyArray(arr) {

    "use strict";

    var copy, i;
    copy = [];





    if (Object.prototype.toString.apply(arr) === '[object Array]') {
        for (i = 0; i < arr.length; i += 1) {
            copy.push(copyArray(arr[i]));
        }
    } else {

        copy = arr;



    }




    return copy;

}

//Extracts the top left to bottom right cross of the board and makes it into an array of three
function getHighLeftDiagonal(arr) {

    "use strict";

    var i, diagonal = [];

    //I use 3, but it's to save time.
    for (i = 0; i < 3; i += 1) {


        diagonal[i] = arr[i][i];

    }

    return diagonal;

}


//Extracts the bottom left to top right cross of the board and makes it into an array of three
function getLowLeftDiagonal(arr) {

    "use strict";

    var i, j = 2, diagonal = [];

    //I use 3, but it's to save time.
    for (i = 0; i < 3; i += 1) {


        diagonal[i] = arr[j][i];

        j -= 1;

    }

    return diagonal;

}


//Extracts one the three rows of the board and makes it into an array of three
function getRow(arr, position) {

    "use strict";

    var i, row = [];

    //I use 3, but it's to save time.
    for (i = 0; i < 3; i += 1) {

        row[i] = arr[position][i];


    }

    return row;

}


//Extracts one the three columns of the board and makes it into an array of three
function getColumn(arr, position) {

    "use strict";

    var i, column = [];

    //I use 3, but it's to save time.
    for (i = 0; i < 3; i += 1) {

        column[i] = arr[i][position];


    }

    return column;


}

//Checks if any array of three items or a Tic Tac Toe "row" has a win or loss
function rowLossCheck(row) {

    "use strict";

    var i, loss = true;
    for (i = 0; i < row.length; i += 1) {
        if (row[i] !== 'o') {
            loss = false;


        }

    }

    return loss;

}

//Checks if a game is lost by X
function gameLossCheck(arr) {

    "use strict";


    var loss = false;
    if (rowLossCheck(getColumn(arr, 0)) || rowLossCheck(getColumn(arr, 1)) || rowLossCheck(getColumn(arr, 2)) || rowLossCheck(getRow(arr, 0)) || rowLossCheck(getRow(arr, 1)) || rowLossCheck(getRow(arr, 2)) || rowLossCheck(getHighLeftDiagonal(arr)) || rowLossCheck(getLowLeftDiagonal(arr))) {
        loss = true;

    }

    return loss;

}

function moveCalculator(board, history) {

    "use strict";

    if (history === undefined) {

        history = "";

    }

}

//A list of possible move locations
function possibleMoveLocations(board) {

    "use strict";

    var poss = [], i, j;

    for (i = 0; i < 3; i += 1) {
        for (j = 0; j < 3; j += 1) {

            if (board[i][j] === 'n') {


                    poss.push([i, j]);


            }
        }

    }

    return poss;

}

//Build an array of possible games
function makeMoveBranch(board, lastTurn) {

    "use strict";

    //possi is a reference to the array of possible moves
    //x and y are the row and column of the board
    var moveTree = [], moveBranch = [], possi = possibleMoveLocations(board), i, j, x, y;

        //end of the iteration


    for (i = 0; i < possibleMoveLocations(board).length; i += 1) {

        moveBranch.push(copyArray(board));

        x = possi[i][0];
        y = possi[i][1];

            //To complete the branch with an 'x' or an 'o'
        if (lastTurn === 'x') {
            moveBranch[i][x][y] = 'o';

        } else {
            moveBranch[i][x][y] = 'x';

        }





    }

    return moveBranch;

}

//Pull a board from a branch of possible boards (or really moves)
function extractBoard(branch) {

    "use strict";

    var moveTree = [], i;

//    for (branch.length

}

//function makeMoveTree(branch, lastTurn) {


//    "use strict";

    //possi is a reference to the array of possible moves
    //x and y are the row and column of the board
//    var moveTree = [], moveBranch = [], possi = possibleMoveLocations(board), i, j, x, y;

        //end of the iteration


//    for (i = 0; i < possibleMoveLocations(board).length; i += 1) {

//        moveBranch.push(copyArray(board));

//        x = possi[i][0];
//        y = possi[i][1];
//
            //To complete the branch with an 'x' or an 'o'
 //       if (lastTurn === 'x') {
//            moveBranch[i][x][y] = 'o';

                //Tree building code
//            for (j = 0; j < moveBranch.length; j += 1) {
//                moveTree.push([copyArray(makeMoveBranch(moveBranch[j], 'o'))]);
//            }

//        } else {
//            moveBranch[i][x][y] = 'x';

                //Alternate turn of Tree building
//            for (j = 0; j < moveBranch.length; j += 1) {
//                moveTree.push([copyArray(makeMoveBranch(moveBranch[j], 'x'))]);
            //    }
//            }




//        }
//    }

//    return moveTree;

//}


document.writeln(getLowLeftDiagonal(squares));
document.writeln(gameLossCheck(squares));
document.writeln(makeMoveBranch(squares, lastTurner));