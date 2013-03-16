    dBoard.possibleMoveLocations = function () {

        var possibilities = [], i, j;

        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {

                if (this.squares[i][j] === 'n') {


                    possibilities.push([i, j]);


                }
            }

        }

        return possibilities;

    };