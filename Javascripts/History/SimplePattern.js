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


//TTT.copyArray method.  This is my deep copy method.  I don't know that it is as good
//as can be, but it tests whether the array has arrays inside, which is better than just
//slice itself.  It takes one argument Arr.
TTT.copyArray = function (arr) {


    "use strict";

    var copy, i;
    copy = [];


    if (Object.prototype.toString.apply(arr) === '[object Array]') {
        for (i = 0; i < arr.length; i += 1) {
            copy.push(TTT.copyArray(arr[i]));
        }
    } else {

        copy = arr;

    }

    return copy;

};

TTT.possibleMoveLocations = function (arr) {

    var poss = [], i, j;

    for (i = 0; i < 3; i += 1) {
        for (j = 0; j < 3; j += 1) {

            if (arr[i][j] === 'n') {


                poss.push([i, j]);


            }
        }

    }

    return poss;

};

//Extracts the top left to bottom right cross of the board and makes it into an array of three
TTT.getHighLeftDiagonal = function (arr) {

    "use strict";

    var i, diagonal = [];

    //I use 3, but it's to save time.
    for (i = 0; i < 3; i += 1) {


        diagonal[i] = arr[i][i];

    }

    return diagonal;

};


//Extracts the bottom left to top right cross of the board and makes it into an array of three
TTT.getLowLeftDiagonal = function (arr) {

    "use strict";

    var i, j = 2, diagonal = [];

    //I use 3, but it's to save time.
    for (i = 0; i < 3; i += 1) {


        diagonal[i] = arr[j][i];

        j -= 1;

    }

    return diagonal;

};


//Extracts one the three rows of the board and makes it into an array of three
TTT.getRow = function (arr, position) {

    "use strict";

    var i, row = [];

    //I use 3, but it's to save time.
    for (i = 0; i < 3; i += 1) {

        row[i] = arr[position][i];


    }

    return row;

};


//Extracts one the three columns of the board and makes it into an array of three
TTT.getColumn = function (arr, position) {

    "use strict";

    var i, column = [];

    //I use 3, but it's to save time.
    for (i = 0; i < 3; i += 1) {

        column[i] = arr[i][position];


    }

    return column;


};

//Checks if any array of three items or a Tic Tac Toe "row" has a loss for X
TTT.rowLossCheck = function (row) {

    "use strict";

    var i, loss = true;
    for (i = 0; i < row.length; i += 1) {
        if (row[i] !== 'o') {
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
TTT.gameLossCheck = function (arr) {

    "use strict";


    var loss = false;
    if (TTT.rowLossCheck(TTT.getColumn(arr, 0)) || TTT.rowLossCheck(TTT.getColumn(arr, 1)) || TTT.rowLossCheck(TTT.getColumn(arr, 2)) || TTT.rowLossCheck(TTT.getRow(arr, 0)) || TTT.rowLossCheck(TTT.getRow(arr, 1)) || TTT.rowLossCheck(TTT.getRow(arr, 2)) || TTT.rowLossCheck(TTT.getHighLeftDiagonal(arr)) || TTT.rowLossCheck(TTT.getLowLeftDiagonal(arr))) {
        loss = true;

    }

    return loss;

};

//Checks if a game is lost by X
TTT.gameWinCheck = function (arr) {

    "use strict";


    var win = false;
    if (TTT.rowWinCheck(TTT.getColumn(arr, 0)) || TTT.rowWinCheck(TTT.getColumn(arr, 1)) || TTT.rowWinCheck(TTT.getColumn(arr, 2)) || TTT.rowWinCheck(TTT.getRow(arr, 0)) || TTT.rowWinCheck(TTT.getRow(arr, 1)) || TTT.rowWinCheck(TTT.getRow(arr, 2)) || TTT.rowWinCheck(TTT.getHighLeftDiagonal(arr)) || TTT.rowWinCheck(TTT.getLowLeftDiagonal(arr))) {
        win = true;

    }

    return win;

};

//Checks for a tie game and takes a tic tac toe board array.
TTT.gameTieCheck = function (arr) {

    "use strict";

    var tie = false;

    if (!this.gameWinCheck(arr) && !this.gameLossCheck(arr) && (TTT.possibleMoveLocations(arr).length === 0)){

        tie = true;

    }

    return tie;

};

//A function that calls itself to return a dBoard Object
//It takes a 3 x 3 array that is the boardStart argument and what the last turn of
//the game was which is the lastTurn argument.
TTT.boardBuilder = function (boardStart, lastTurn) {

    "use strict";

    var dBoard = Object.create(Function);

    dBoard.squares = TTT.copyArray(boardStart);
    dBoard.whoseTurn = lastTurn;
    dBoard.gameLoss = TTT.gameLossCheck(boardStart);
    dBoard.gameWin = TTT.gameWinCheck(boardStart);

    //A function that returns who's turn is next
    dBoard.nextTurn = function () {

        var next;
        if (this.whoseTurn === "x") {
            next = 'o';
        } else {
            next = 'x';
        }
        return next;

    };

    //An array of two arrays that contains possible moves
    //The first array contains the x coordinate and the second is the y coordinate.
    //So the first elements of the two arrays are a pair, just like the second two elements
    //Or like how the nth two elements are also a pair.

    dBoard.possibleMoveLocations = function () {

        var poss = [], i, j;

        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {

                if (this.squares[i][j] === 'n') {


                    poss.push([i, j]);


                }
            }

        }

        return poss;

    };

    dBoard.branches = function () {

        //possi is a reference to the array of possible moves
        //x and y are the row and column of the board
        var squares = TTT.copyArray(this.squares), branch = [], possi = dBoard.possibleMoveLocations(), i, x, y;

        //Filter for an ended game.
        if (!this.gameLoss || !this.gameWin) {

            //end of the iteration


            for (i = 0; i < possi.length; i += 1) {
                x = possi[i][0];
                y = possi[i][1];

                    //To complete the branch with an 'x' or an 'o'
                if (this.whoseTurn === 'x') {
        //There may be problems here with how the boards get assigned to branches
     //there may also be problem this which turn is being assigned.
                    branch[i] = TTT.boardBuilder(squares, this.nextTurn());
                    branch[i].squares[x][y] = 'o';

                } else {
                    branch[i] = TTT.boardBuilder(squares, this.nextTurn());
                    branch[i].squares[x][y] = 'x';
                }
            }
        }

        return branch;
    };



    //Checks if a move is safe, which takes a dBoard as an argument.
    //In the event that many moves remain in the game it calls the safeBranch function
    //To determine recursively if there is anything looming that we should worry about.
    dBoard.safeBoard = function (aBoard) {

        var board = false;

        if (!(aBoard.gameLoss === true) || (a.Board.gameWin === true)) {
            if(dBoard.safeBranch(aBoard) === true) {
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
            for (i = 0; i < aBoard.branches().length; i +=1) {
                branch = true;
                break;
            }

    };



    };
    return dBoard;
};

var tBoard = [['n', 'x', 'o'], ['o', 'x', 'x'], ['x', 'o', 'n']];
var aBoard = TTT.boardBuilder(tBoard, 'x');