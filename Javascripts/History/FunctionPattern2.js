//Tic Tac Toe Function Object Pattern Notebook

//A BRIEF HISTORY
//My work so far on this Tic Tac Toe Program has taken my through many different approaches.
//i. My original approach had been to just work with functions and arrays by storing arrays inside of arrays.
//This reached insane complexity quickly.
//ii. Next I created a Board Object, which worked much better but has evolved into a dualism
//of a board making function and a board.  This is too complicated.
//Also, I was having trouble getting 'this' right and complexity rose too high.
//My next pattern is to begin straight from the function that returns my board object
//and build from that start.

//COMPATIBILITY
//Originally I was writing for ECMAScript 3 using Strict Mode, but about halfway through my
//this complexity problems I thought using some of the ECMAScript 5 features might help.
//I was wrong and am reverting back to ECMAScript 3 with Strict Mode.

//A GUESS
//I don't really like making plans, if I don't need to.  I prefer to guess if I can.

//GUESS, THE FIRST: My plan is to make a web of objects and arrays that allow me to easily
//calculate for any given move if by making it that it may cause the artificial intelligence to lose.

//GUESS, THE SECOND My second plan is to make a function that returns a board.  It should
//have and do as little as it needs to in order create it's web of arrays and objects that
//calculate every possible move after the given move.  I want my functions methods

//GUESS, THE THIRD After I can get all the moves predicted is to embed a chain going from
//the function where the game can no longer be played all the way back to the earliest move
//of the game.  The chain passes the message of which moves lead to failure.

//PROBLEMS       [P denotes Problem, PS denotes Potential Solution]
//P: If I make a function that creates the board how much can it be responsible for?
//How do I keep things separate enough that I can make my branches of arrays go all
//the way down to the last move and back up again.
//PS: I should first make my boardBuilder as simple and independent as possible
//P:My functions, methods and properties have gotten too complicated.  Certain parts are not
//working.
//PS: Don't complicate things.  It is better to just make a simple method that returns the
//value that I want than to try and create fancy property setters and getters.

//THOUGHTS
//I've been trying to be very object oriented, but functional programing is great if it is
//my best solution.

//Adds to Object object a create function for prototypical inheritance rather than pseudoclassical.

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        "use strict";

        function F() {}
        F.prototype = o;
        return new F();
    };

}

//Method method.  Adds a method to any Object.

Function.prototype.method = function (name, func) {

    "use strict";

    this.prototype[name] = func;
    return this;
};

//The Global Variable for my Tic Tac Toe Application
var TTT = {};

//PROBLEMS
//P: My copyArray method doesn't have a great place to go.  I could put it in the Array itself,
//I could put it in my Application Global, I could put it in my boardBuilder function or
//even independent of that?
//PS: I have heard that modifying the basic Object types is bad, but Douglass Crockford does
//it, so even though I don't know the answer I'm going to put it in the Array
//Thinking more on this, I'm not really working at the kind of scale or complexity where
//it is dangerous, so I'm no longer worried.
//
//Actually in the end I just put this in my programs global object.
//I think this makes the program safer to use around other JS.


//TTT.copyArray method.  This is my array copying method.  It tests whether
//the array has arrays inside.  It takes one argument array.
TTT.copyArray = function (array) {

    "use strict";

    var arrayCopy, i;
    arrayCopy = [];


    if (Object.prototype.toString.apply(array) === '[object Array]') {
        for (i = 0; i < array.length; i += 1) {
            arrayCopy.push(TTT.copyArray(array[i]));
        }
    } else {

        arrayCopy = array;

    }

    return arrayCopy;

};

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

//A function that calls itself to return a dBoard Object
//It takes a 3 x 3 array that is the boardStart argument and what the last turn of
//the game was which is the lastTurn argument.
TTT.boardBuilder = function (boardStart, lastTurn) {

    "use strict";

    var dBoard = {

        possibleMoveLocations: function () {

            var possibilities = [], i, j;

            for (i = 0; i < 3; i += 1) {
                for (j = 0; j < 3; j += 1) {

                    if (this.squares[i][j] === 'n') {


                        possibilities.push([i, j]);


                    }
                }

            }

            return possibilities;

        },

        squares: TTT.copyArray(boardStart),

        whoseTurn: lastTurn,

        gameLoss: TTT.gameLossCheck(boardStart),

        gameWin: TTT.gameWinCheck(boardStart),

        nextTurn: function () {

            var nextMove;
            if (this.whoseTurn === "x") {
                nextMove = 'o';
            } else {
                nextMove = 'x';
            }
            return nextMove;

        }
    },

        makeBranches = function () {

            var squares = TTT.copyArray(dBoard.squares), branch = [], possibilities = dBoard.possibleMoveLocations(), i, x, y,

                addPossibleOutcomeToBranch = function (whoseTurn) {

                    branch.push(TTT.boardBuilder(squares, dBoard.nextTurn()));

                    if (this.whoseTurn === 'x') {
                        branch[i].squares[x][y] = 'o';

                    } else {
                        branch[i].squares[x][y] = 'x';
                    }

                    return;

                },

                gameIsPlayable = function () {

                    return (!dBoard.gameLoss || !dBoard.gameWin);

                };

            if (gameIsPlayable()) {

                for (i = 0; i < possibilities.length; i += 1) {
                    x = possibilities[i][0];
                    y = possibilities[i][1];

                    addPossibleOutcomeToBranch();

                }
            }

            return branch;
        };



    //Checks if a move is safe, which takes a dBoard as an argument.
    //In the event that many moves remain in the game it calls the safeBranch function
    //To determine recursively if there is anything looming that we should worry about.
    dBoard.safeBoard = function (aBoard) {

        var board = false;

        if (!(aBoard.gameLoss === true) || (aBoard.gameWin === true)) {
            if (dBoard.safeBranch(aBoard) === true) {
                board = true;
            }
        }

        if ((aBoard.gameWin === true) || (aBoard.gameTie === true)) {
            board = true;
        }
        return board;
    };

    dBoard.safeBranch = function (aBoard) {

        var i, branch = false;

        //If one branch of possible moves has one possible move that allows o to control the
        //game, then we must assume o shall choose it and that the whole branch is bad.
        if (dBoard.thisTurn === 'o') {

            //Checks each board for a game loss
            for (i = 0; i < aBoard.branches().length; i += 1) {
                if (aBoard.branches().gameLoss === true) {
                    break;
                }
            }
        //If any of the 'x' moves works then the branch is good.
        } else {
            for (i = 0; i < aBoard.branches().length; i += 1) {
                branch = true;
                break;
            }

        };

    };
    return dBoard;
};

var tBoard = [['n', 'x', 'o'], ['o', 'x', 'x'], ['x', 'o', 'n']];
var aBoard = TTT.boardBuilder(tBoard, 'x');