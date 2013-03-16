//Adds to Object object a create function for prototypical inheritance rather than pseudoclassical.

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        "use strict";

        function F() {}
        F.prototype = o;
        return new F();
    };

}


var board = {

    squares: [['n', 'n', 'n'], ['n', 'n', 'n'], ['n', 'n', 'n']],
    whoseTurn: 'x',
    that: this,

    //Copy Array - Copies any array
    copyArray: function (arr) {

        "use strict";

        var copy, i;
        copy = [];





        if (Object.prototype.toString.apply(arr) === '[object Array]') {
            for (i = 0; i < arr.length; i += 1) {
                copy.push(this.copyArray(arr[i]));
            }
        } else {

            copy = arr;



        }




        return copy;

    },



    //A list of possible move locations
    possibleMoveLocations: function () {

        "use strict";

        var poss = [], i, j;

        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {

                if (this.squares[i][j] === 'n') {


                    poss.push([i, j]);


                }
            }

        }

        return poss;

    },


    get branches () {

        "use strict";

        //possi is a reference to the array of possible moves
        //x and y are the row and column of the board
        var possi = this.possibleMoveLocations(this.squares), branch = [], i, x, y;

            //end of the iteration


        for (i = 0; i < this.possibleMoveLocations(this.squares).length; i += 1) {

            branch.push(this.copyArray(this.dataBoard()));

            x = possi[i][0];
            y = possi[i][1];

                //To complete the branch with an 'x' or an 'o'
            if (this.whoseTurn === 'x') {
                branch[i].squares[x][y] = 'o';
                branch[i].whoseTurn = 'o'

            } else {
                branch[i].squares[x][y] = 'x';
                branch[i].whoseTurn = 'o'

            }





        }

        return branch;

    },

    set branches (value) {

        "use strict";

        throw {

            name: 'AssignmentError',
            message: 'branches cannon be set'

        };

    },

    dataBoard: function () {

        "use strict";

        var dBoard = Object.create(Function);

        dBoard.squares = this.copyArray(this.squares);
        dBoard.whoseTurn = 'x';
        dBoard.getThat = function () {

            var that;
            that = this;
            return that;

            }

        dBoard.branches = function () {

                "use strict";

                //possi is a reference to the array of possible moves
                //x and y are the row and column of the board
                var possi = board.possibleMoveLocations(dBoard.squares), branch = [], i, x, y;

                    //end of the iteration


                for (i = 0; i < board.possibleMoveLocations(dBoard.squares).length; i += 1) {

                    branch.push(board.copyArray(dBoard.squares));

                    x = possi[i][0];
                    y = possi[i][1];

                        //To complete the branch with an 'x' or an 'o'
                    if (this.whoseTurn === 'x') {
                        branch[i].squares[x][y] = 'o';

                    } else {
                        branch[i].squares[x][y] = 'x';

                    }





                }

                return branch;

            }

return dBoard;

}};