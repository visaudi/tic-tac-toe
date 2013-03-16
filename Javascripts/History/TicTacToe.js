//Tic Tac Toe.js by Ben Pardo February 6th 2013






//Add a create method to all objects.  This let's me work with prototypical inheritance.

if (typeof Object.create !== 'function') {

    Object.create = function (o) {

//Written in Strict Mode:
        "use strict";

        var F = function () {};         //Make a simple function/object
        F.prototype = o;                //The prototype of our new object is the same as the object o.
        return new F();                 //Return the new object to be a method of Object

    };



}

//Our program variable.  In order to minimize the use of global objects:

var TTT = {};


//A model of the Tic Tac Toe Game



//The game board.
TTT.board = (function () {

    "use strict";

    //The Board is a 3 x 3 array which is hidden from the rest of the program:
    var squares = [['n', 'n', 'n'], ['n', 'n', 'n'], ['n', 'n', 'n']], lastPlay = "s";

    //A test that we are given numbers good for the array
    function rightInputs(row, column) {

        return (typeof (row && column) === 'number')  && ((row <= 2)  && (row >= 0)  && (column <= 2)  && (column >= 0));

    }

    function isPlayable(row, column) {

        var playability;

        if (squares[row][column] === 'n') {
            playability = true;
        } else {
            playability = false;
        }

        return playability;

    }


    return {

        //getSquare finds out whether a square is an 'x', an 'o', or an 'n'
        getSquare: function (row, column) {

            //Testing for inputs that are beyond the array.
            if (rightInputs(row, column)) {
                return squares[row][column];
            }
        },

        //getLastSetter lets us know who last played.  If anyone has played.
        getLastSetter: function () {

            return lastPlay;

        },

        //setXSquare makes a square an 'x'
        setXSquare: function (row, column) {

            //Testing for inputs beyond the array:
            if (rightInputs(row, column) && isPlayable(row, column) && ((lastPlay === 'o') || (lastPlay === 's'))) {
                squares[row][column] = 'x';

                //Let it be known who's turn was last
                lastPlay = 'x';
            }

            return;

        },

        //setOSquare makes a square an 'o'
        setOSquare: function (row, column) {

            //Testing for bad inputs:
            if (rightInputs(row, column) && isPlayable(row, column) && ((lastPlay === 'x') || (lastPlay === 's'))) {
                squares[row][column] = 'o';

                //Let it be known who's turn was last
                lastPlay = 'o';
            }

            return;

        }


    };


}());

//TTT.computer is the artificial intelligence object
TTT.computer = (function () {

    "use strict";

    return {

    };

}());