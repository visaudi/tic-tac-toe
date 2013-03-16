    dBoard.branches = function () {

        //possibilities is a reference to the array of possibilitiesble moves
        //x and y are the row and column of the board
        var squares = TTT.copyArray(this.squares), branch = [], possibilities = dBoard.possibleMoveLocations(), i, x, y;

        //Filter for an ended game.
        if (!this.gameLoss || !this.gameWin) {

            //end of the iteration


            for (i = 0; i < possibilities.length; i += 1) {
                x = possibilities[i][0];
                y = possibilities[i][1];

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