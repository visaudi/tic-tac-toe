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