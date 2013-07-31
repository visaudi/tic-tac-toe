YUI.add('tic-tac-toe-board', function (Y) {
    "use strict";

    Y.ticTacToeBoard = Y.Base.create('tic-tac-toe-board', Y.Widget, [], {

        NAME: "tic-tac-toe-board",

        initializer: function () {

        },
        makeBoardArrayFromSquareAttrs: function (transferredBoard) {

            var board = Y.clone(transferredBoard);

            board.projectAllPossibleBoardsThisTurn = function () {

                var futureBoard,
                    consideredPossibilityLocation,
                    i,
                    possibleBoardList = [];

                for (i = 0; i < this.possibleMoveLocations(this).length; i += 1) {
                    futureBoard = Y.clone(this);
                    consideredPossibilityLocation = this.possibleMoveLocations(this)[i];
                    futureBoard[consideredPossibilityLocation[0]][consideredPossibilityLocation[1]] = 'o';
                    possibleBoardList.push(futureBoard);
                }
                return possibleBoardList;
            };


            board.projectAllPossibleXMoveBoardsThisTurn = function () {

                var futureBoard,
                    consideredPossibilityLocation,
                    i,
                    possibleBoardList = [];

                for (i = 0; i < this.possibleMoveLocations(this).length; i += 1) {
                    futureBoard = Y.clone(this);
                    consideredPossibilityLocation = this.possibleMoveLocations(this)[i];
                    futureBoard[consideredPossibilityLocation[0]][consideredPossibilityLocation[1]] = 'x';
                    possibleBoardList.push(futureBoard);
                }
                return possibleBoardList;
            };

            board.projectAllMovesTwoTurnsAhead = function () {
                var movesToMake,
                    movePossibilities,
                    secondMovePossibilities,
                    thirdMovePossibilities,
                    fourthMovePossibilities,

                    currentBeyondMove,
                    nextPossibleLocation,

                    rangeOfBoards = [];

                movesToMake = this.projectAllPossibleBoardsThisTurn(this);


                for (movePossibilities = 0; movePossibilities < movesToMake.length; movePossibilities += 1) {

                    if(movesToMake.length === 1) {
                        currentBeyondMove = Y.clone(movesToMake[movePossibilities]);
                        currentBeyondMove.nextTurnBoard = movesToMake[movePossibilities];

                        rangeOfBoards.push(currentBeyondMove);

                    } else {

                        for (secondMovePossibilities = 0; secondMovePossibilities < (movesToMake.length - 1); secondMovePossibilities += 1) {


                            if(movesToMake.length === 2) {
                                currentBeyondMove = Y.clone(movesToMake[movePossibilities]);
                                currentBeyondMove.nextTurnBoard = movesToMake[movePossibilities];


                                nextPossibleLocation = this.possibleMoveLocations(currentBeyondMove)[secondMovePossibilities];
                                currentBeyondMove[nextPossibleLocation[0]][nextPossibleLocation[1]] = 'x';

                                rangeOfBoards.push(currentBeyondMove);

                            } else {

                                for (thirdMovePossibilities = 0; thirdMovePossibilities < (movesToMake.length - 2); thirdMovePossibilities += 1) {

                                    if(movesToMake.length === 3) {
                                        currentBeyondMove = Y.clone(movesToMake[movePossibilities]);
                                        currentBeyondMove.nextTurnBoard = movesToMake[movePossibilities];


                                        nextPossibleLocation = this.possibleMoveLocations(currentBeyondMove)[secondMovePossibilities];
                                        currentBeyondMove[nextPossibleLocation[0]][nextPossibleLocation[1]] = 'x';

                                        nextPossibleLocation = this.possibleMoveLocations(currentBeyondMove)[thirdMovePossibilities];
                                        currentBeyondMove[nextPossibleLocation[0]][nextPossibleLocation[1]] = 'o';


                                        rangeOfBoards.push(currentBeyondMove);

                                    } else {

                                        for (fourthMovePossibilities = 0; fourthMovePossibilities < (movesToMake.length - 3); fourthMovePossibilities += 1) {

                                            currentBeyondMove = Y.clone(movesToMake[movePossibilities]);
                                            currentBeyondMove.nextTurnBoard = movesToMake[movePossibilities];

                                            nextPossibleLocation = this.possibleMoveLocations(currentBeyondMove)[secondMovePossibilities];
                                            currentBeyondMove[nextPossibleLocation[0]][nextPossibleLocation[1]] = 'x';

                                            nextPossibleLocation = this.possibleMoveLocations(currentBeyondMove)[thirdMovePossibilities];
                                            currentBeyondMove[nextPossibleLocation[0]][nextPossibleLocation[1]] = 'o';

                                            nextPossibleLocation = this.possibleMoveLocations(currentBeyondMove)[fourthMovePossibilities];
                                            currentBeyondMove[nextPossibleLocation[0]][nextPossibleLocation[1]] = 'x';

                                            rangeOfBoards.push(currentBeyondMove);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                    return rangeOfBoards;
            };

            board.possibleMoveLocations = function (gameBoard) {

                var possibilities = [], x, y;

                for (x = 0; x < 3; x += 1) {
                    for (y = 0; y < 3; y += 1) {

                        if (gameBoard[x][y] === 'n') {

                            possibilities.push([x, y]);


                        }
                    }
                }
                return possibilities;

            };

            board.getColumn = function (columnPosition, gameBoard) {

                var x, column = [];

                for (x = 0; x < 3; x += 1) {

                    column[x] = gameBoard[x][columnPosition];


                }

                return column;


            };

            board.getRow = function (rowPosition, gameBoard) {

                var y, extractedRow = [];

                for (y = 0; y < 3; y += 1) {

                    extractedRow[y] = gameBoard[rowPosition][y];


                }

                return extractedRow;

            };

            board.getHighLeftDiagonal = function (gameBoard) {

                var xAndY, diagonal = [];

                for (xAndY = 0; xAndY < 3; xAndY += 1) {

                    diagonal[xAndY] = gameBoard[xAndY][xAndY];

                }

                return diagonal;

            };

            board.getLowLeftDiagonal = function (gameBoard) {

                var x, y = 2, diagonal = [];


                for (x = 0; x < 3; x += 1) {
                    diagonal[x] = gameBoard[y][x];

                    y -= 1;

                }

                return diagonal;

            };

            board.rowOCount = function (row) {

                var square, oNumber  = 0;

                for (square = 0; square < row.length; square += 1) {
                    if (row[square] === 'o') {
                        oNumber  += 1;
                    }

                }

                return oNumber;

            };

            board.rowXCount = function (row) {

                var square, xNumber  = 0;

                for (square = 0; square < row.length; square += 1) {
                    if (row[square] === 'x') {
                        xNumber  += 1;
                    }

                }

                return xNumber;

            };

            board.checkForMixedRow = function (row) {

                var mixed = false;
                if ((this.rowXCount(row) > 0) && (this.rowOCount(row) > 0)) {
                    mixed = true;
                }

                return mixed;

            };


            board.checkGameTie = function (gameBoard) {

                var tie = false;
                if ((this.checkForMixedRow(this.getColumn(0, gameBoard))) &&
                        (this.checkForMixedRow(this.getColumn(1, gameBoard))) &&
                        (this.checkForMixedRow(this.getColumn(2, gameBoard))) &&
                        (this.checkForMixedRow(this.getRow(0, gameBoard))) &&
                        (this.checkForMixedRow(this.getRow(1, gameBoard))) &&
                        (this.checkForMixedRow(this.getRow(2, gameBoard))) &&
                        (this.checkForMixedRow(this.getHighLeftDiagonal(gameBoard))) &&
                        (this.checkForMixedRow(this.getLowLeftDiagonal(gameBoard)))) {
                    tie = true;
                }

                return tie;

            };


            board.checkGameWinForX = function (gameBoard) {

                var win = false;
                if ((this.rowXCount(this.getColumn(0, gameBoard)) === 3) ||
                        (this.rowXCount(this.getColumn(1, gameBoard)) === 3) ||
                        (this.rowXCount(this.getColumn(2, gameBoard)) === 3) ||
                        (this.rowXCount(this.getRow(0, gameBoard)) === 3) ||
                        (this.rowXCount(this.getRow(1, gameBoard)) === 3) ||
                        (this.rowXCount(this.getRow(2, gameBoard)) === 3) ||
                        (this.rowXCount(this.getHighLeftDiagonal(gameBoard)) === 3) ||
                        (this.rowXCount(this.getLowLeftDiagonal(gameBoard)) === 3)) {
                    win = true;
                }

                return win;

            };

            board.checkGameWinForO = function (gameBoard) {

                var win = false;
                if ((this.rowOCount(this.getColumn(0, gameBoard)) === 3) ||
                        (this.rowOCount(this.getColumn(1, gameBoard)) === 3) ||
                        (this.rowOCount(this.getColumn(2, gameBoard)) === 3) ||
                        (this.rowOCount(this.getRow(0, gameBoard)) === 3) ||
                        (this.rowOCount(this.getRow(1, gameBoard)) === 3) ||
                        (this.rowOCount(this.getRow(2, gameBoard)) === 3) ||
                        (this.rowOCount(this.getHighLeftDiagonal(gameBoard)) === 3) ||
                        (this.rowOCount(this.getLowLeftDiagonal(gameBoard)) === 3)) {
                    win = true;
                }

                return win;

            };

            board.twoToWinForO = function (gameBoard) {
                var twoToWinOccurrences = 0;
                if ((this.rowOCount(this.getColumn(0, gameBoard)) === 1) && (this.rowXCount(this.getColumn(0, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getColumn(1, gameBoard)) === 1) && (this.rowXCount(this.getColumn(1, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getColumn(2, gameBoard)) === 1) && (this.rowXCount(this.getColumn(2, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }
                if ((this.rowOCount(this.getRow(0, gameBoard)) === 1) && (this.rowXCount(this.getRow(0, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getRow(1, gameBoard)) === 1) && (this.rowXCount(this.getRow(1, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getRow(2, gameBoard)) === 1) && (this.rowXCount(this.getRow(2, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getHighLeftDiagonal(gameBoard)) === 1) && (this.rowXCount(this.getHighLeftDiagonal(gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getLowLeftDiagonal(gameBoard)) === 1) && (this.rowXCount(this.getLowLeftDiagonal(gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                return twoToWinOccurrences;
            };



            board.twoToWinForX = function (gameBoard) {
                var twoToWinOccurrences = 0;
                if ((this.rowXCount(this.getColumn(0, gameBoard)) === 1) && (this.rowOCount(this.getColumn(0, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getColumn(1, gameBoard)) === 1) && (this.rowOCount(this.getColumn(1, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getColumn(2, gameBoard)) === 1) && (this.rowOCount(this.getColumn(2, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }
                if ((this.rowXCount(this.getRow(0, gameBoard)) === 1) && (this.rowOCount(this.getRow(0, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getRow(1, gameBoard)) === 1) && (this.rowOCount(this.getRow(1, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getRow(2, gameBoard)) === 1) && (this.rowOCount(this.getRow(2, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getHighLeftDiagonal(gameBoard)) === 1) && (this.rowOCount(this.getHighLeftDiagonal(gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getLowLeftDiagonal(gameBoard)) === 1) && (this.rowOCount(this.getLowLeftDiagonal(gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                return twoToWinOccurrences;
            };

            board.oneToWinForX = function (gameBoard) {
                var oneToWinOccurrences = 0;
                if ((this.rowXCount(this.getColumn(0, gameBoard)) === 2) && (this.rowOCount(this.getColumn(0, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getColumn(1, gameBoard)) === 2) && (this.rowOCount(this.getColumn(1, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getColumn(2, gameBoard)) === 2) && (this.rowOCount(this.getColumn(2, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }
                if ((this.rowXCount(this.getRow(0, gameBoard)) === 2) && (this.rowOCount(this.getRow(0, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getRow(1, gameBoard)) === 2) && (this.rowOCount(this.getRow(1, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getRow(2, gameBoard)) === 2) && (this.rowOCount(this.getRow(2, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getHighLeftDiagonal(gameBoard)) === 2) && (this.rowOCount(this.getHighLeftDiagonal(gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowXCount(this.getLowLeftDiagonal(gameBoard)) === 2) && (this.rowOCount(this.getLowLeftDiagonal(gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                return oneToWinOccurrences;
            };

            board.oneToWinForO = function (gameBoard) {
                var oneToWinOccurrences = 0;
                if ((this.rowOCount(this.getColumn(0, gameBoard)) === 2) && (this.rowXCount(this.getColumn(0, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getColumn(1, gameBoard)) === 2) && (this.rowXCount(this.getColumn(1, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getColumn(2, gameBoard)) === 2) && (this.rowXCount(this.getColumn(2, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }
                if ((this.rowOCount(this.getRow(0, gameBoard)) === 2) && (this.rowXCount(this.getRow(0, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getRow(1, gameBoard)) === 2) && (this.rowXCount(this.getRow(1, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getRow(2, gameBoard)) === 2) && (this.rowXCount(this.getRow(2, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getHighLeftDiagonal(gameBoard)) === 2) && (this.rowXCount(this.getHighLeftDiagonal(gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((this.rowOCount(this.getLowLeftDiagonal(gameBoard)) === 2) && (this.rowXCount(this.getLowLeftDiagonal(gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                return oneToWinOccurrences;
            };

            board.filterForWinX = function (arrayOfBoards) {

                var winningXBoards;
                winningXBoards = Y.Array.filter(arrayOfBoards, this.checkGameWinForX, this);
                return winningXBoards;
            };


            board.filterForWinO = function (arrayOfBoards) {

                var winningOBoards;
                winningOBoards = Y.Array.filter(arrayOfBoards, this.checkGameWinForO, this);
                return winningOBoards;
            };

            board.filterAgainstWinForX = function (arrayOfBoards) {

                var xBoardsNotWinning, checkNotGameWinForX;

                checkNotGameWinForX = function (gameBoard) {
                    return !this.checkGameWinForX(gameBoard);
                };

                xBoardsNotWinning = Y.Array.filter(arrayOfBoards, checkNotGameWinForX, this);
                return xBoardsNotWinning;

            };

            board.filterForNumberOfXOneToWinsPerBoard = function (gameBoard, numberOfOneToWinsPerBoardToFilterFor) {

                return (this.oneToWinForX(gameBoard) === numberOfOneToWinsPerBoardToFilterFor);

            };


            board.filterForNumberOfOOneToWinsPerBoard = function (gameBoard, numberOfOneToWinsPerBoardToFilterFor) {

                return (this.oneToWinForO(gameBoard) === numberOfOneToWinsPerBoardToFilterFor);

            };


            board.filterForNumberOfXTwoToWinsPerBoard = function (gameBoard, numberOfTwoToWinsPerBoardToFilterFor) {

                return (this.twoToWinForX(gameBoard) === numberOfTwoToWinsPerBoardToFilterFor);

            };


            board.filterForNumberOfOTwoToWinsPerBoard = function (gameBoard, numberOfTwoToWinsPerBoardToFilterFor) {

                return (this.twoToWinForO(gameBoard) === numberOfTwoToWinsPerBoardToFilterFor);

            };

            board.filterForHighestOneToWinForX = function (arrayOfBoards) {

                var highestOneToWinBoards,
                    highestNumberOfOneToWins,
                    makeFilterForCurrentNumberOfOneToWinsPerBoard,
                    filterForCurrentNumberOfOneToWinsPerBoard;

                highestOneToWinBoards = [];
                highestNumberOfOneToWins = 0;

                makeFilterForCurrentNumberOfOneToWinsPerBoard = function (numberOfOneToWinPerBoard) {
                    return function (sameArrayOfBoards) {

                        return this.filterForNumberOfXOneToWinsPerBoard(sameArrayOfBoards, numberOfOneToWinPerBoard);

                    };

                };

                do {
                    highestNumberOfOneToWins += 1;

                    filterForCurrentNumberOfOneToWinsPerBoard = makeFilterForCurrentNumberOfOneToWinsPerBoard(highestNumberOfOneToWins);
                    highestOneToWinBoards.push(Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfOneToWinsPerBoard, this));
} while ((highestOneToWinBoards[highestOneToWinBoards.length - 1]).length !== 0); 
                highestOneToWinBoards.pop();

                if (highestOneToWinBoards.length !== 0) {
                    highestOneToWinBoards = highestOneToWinBoards[highestOneToWinBoards.length - 1];
                }

                return highestOneToWinBoards;
            };

            board.filterAgainstOneToWinForX = function (arrayOfBoards) {


                var nonOneToWinXBoards;
                nonOneToWinXBoards = Y.Array.reject(arrayOfBoards, this.oneToWinForX, this);
                return nonOneToWinXBoards;

            };

            board.filterForHighestOneToWinForO = function (arrayOfBoards) {

                var highestOneToWinBoards,
                    highestNumberOfOneToWins,
                    makeFilterForCurrentNumberOfOneToWinsPerBoard,
                    filterForCurrentNumberOfOneToWinsPerBoard;

                highestOneToWinBoards = [];
                highestNumberOfOneToWins = 0;

                makeFilterForCurrentNumberOfOneToWinsPerBoard = function (numberOfOneToWinPerBoard) {
                    return function (sameArrayOfBoards) {

                        return this.filterForNumberOfOOneToWinsPerBoard(sameArrayOfBoards, numberOfOneToWinPerBoard);

                    };

                };

                do {
                    highestNumberOfOneToWins += 1;

                    filterForCurrentNumberOfOneToWinsPerBoard = makeFilterForCurrentNumberOfOneToWinsPerBoard(highestNumberOfOneToWins);
                    highestOneToWinBoards.push(Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfOneToWinsPerBoard, this));

                } while ((highestOneToWinBoards[highestOneToWinBoards.length - 1]).length !== 0);

                highestOneToWinBoards.pop();

                if (highestOneToWinBoards.length !== 0) {
                    highestOneToWinBoards = highestOneToWinBoards[highestOneToWinBoards.length - 1];
                }

                return highestOneToWinBoards;
            };

            board.filterForHighestTwoToWinForX = function (arrayOfBoards) {

                var highestTwoToWinBoards,
                    highestNumberOfTwoToWins,
                    makeFilterForCurrentNumberOfTwoToWinsPerBoard,
                    filterForCurrentNumberOfTwoToWinsPerBoard,
                    twoToWinLevelState;

                highestTwoToWinBoards = [];
                highestNumberOfTwoToWins = 0;

                makeFilterForCurrentNumberOfTwoToWinsPerBoard = function (numberOfTwoToWinPerBoard) {
                    return function (sameArrayOfBoards) {

                        return this.filterForNumberOfXTwoToWinsPerBoard(sameArrayOfBoards, numberOfTwoToWinPerBoard);

                    };

                };

                for (highestNumberOfTwoToWins = 1; highestNumberOfTwoToWins < 6; highestNumberOfTwoToWins += 1) {

                    filterForCurrentNumberOfTwoToWinsPerBoard = makeFilterForCurrentNumberOfTwoToWinsPerBoard(highestNumberOfTwoToWins);

                    twoToWinLevelState = Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard, this);

                    if (twoToWinLevelState.length !== 0) {
                        highestTwoToWinBoards.push(Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard, this));
                    }

                }

                if (highestTwoToWinBoards.length !== 0) {
                    highestTwoToWinBoards = highestTwoToWinBoards[highestTwoToWinBoards.length - 1];
                }
                return highestTwoToWinBoards;
            };

            board.filterAgainstHighestTwoToWinForX = function (arrayOfBoards, xRows) {

                var minimalTwoToWinBoards,
                    filterForCurrentNumberOfTwoToWinsPerBoard,
                    xRowDepth = xRows;

                if (xRowDepth === undefined) {
                   xRowDepth = 0; 
                }

                filterForCurrentNumberOfTwoToWinsPerBoard = (function () {

                    return function (sameArrayOfBoards) {
                        return this.filterForNumberOfXTwoToWinsPerBoard(sameArrayOfBoards, xRowDepth);
                    };

                }());

                minimalTwoToWinBoards = Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard, this);
                if ((minimalTwoToWinBoards.length === 0) &&  (xRowDepth !== 6)) {
                    return (this.filterAgainstHighestTwoToWinForX(arrayOfBoards, xRowDepth + 1)); 
                } else {
                    return minimalTwoToWinBoards;
                }    
                
            };

            board.filterForHighestTwoToWinForO = function (arrayOfBoards) {

                var highestTwoToWinBoards,
                    highestNumberOfTwoToWins,
                    makeFilterForCurrentNumberOfTwoToWinsPerBoard,
                    filterForCurrentNumberOfTwoToWinsPerBoard,
                    twoToWinLevelState;

                highestTwoToWinBoards = [];
                highestNumberOfTwoToWins = 0;

                makeFilterForCurrentNumberOfTwoToWinsPerBoard = function (numberOfTwoToWinPerBoard) {
                    return function (sameArrayOfBoards) {

                        return this.filterForNumberOfOTwoToWinsPerBoard(sameArrayOfBoards, numberOfTwoToWinPerBoard);

                    };

                };

                for (highestNumberOfTwoToWins = 1; highestNumberOfTwoToWins < 6; highestNumberOfTwoToWins += 1) {

                    filterForCurrentNumberOfTwoToWinsPerBoard = makeFilterForCurrentNumberOfTwoToWinsPerBoard(highestNumberOfTwoToWins);

                    twoToWinLevelState = Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard, this);

                    if (twoToWinLevelState.length !== 0) {
                        highestTwoToWinBoards.push(Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard, this));
                    }

                }

                if (highestTwoToWinBoards.length !== 0) {
                    highestTwoToWinBoards = highestTwoToWinBoards[highestTwoToWinBoards.length - 1];
                }
                return highestTwoToWinBoards;
            };

            board.findMoveForO = function (gameBoard) {

                var littleResult, bigResult;

                bigResult = gameBoard.projectAllMovesTwoTurnsAhead();

                littleResult = this.filterForWinO(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;


                littleResult = this.filterAgainstWinForX(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = this.filterAgainstOneToWinForX(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = this.filterAgainstHighestTwoToWinForX(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;


                littleResult = this.filterForHighestOneToWinForO(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = this.filterForHighestTwoToWinForO(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;

console.log(bigResult[0]);


                return bigResult[0].nextTurnBoard;

            };
            
            board.findMoveToMaximizeOsPerRow = function () {


                var compareFirstBoardToFinalBoard = function (lastPossibleBoard) {
                        var x, y,
                            moveLocation;

                        for (y = 0; y < 3; y += 1) {
                            for (x = 0; x < 3; x += 1) {
                                if (lastPossibleBoard[y][x] !== board[y][x]) {
                                    moveLocation = [y, x];
                                }
                            }
                        }
                        return moveLocation;
                    };

                return compareFirstBoardToFinalBoard(this.findMoveForO(this));
            };
            return board;

        },

        possibleMoveLocations: function (board) {

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

        renderUI: function () {
            this.get('contentBox')
                .append('<div class="square topHeight left topRowLeft"></div>')
                .append('<div class="square topHeight center topRowCenter"></div>')
                .append('<div class="square topHeight right topRowRight"></div>')

                .append('<div class="square middleHeight left middleRowLeft"></div>')
                .append('<div class="square middleHeight center middleRowCenter"></div>')
                .append('<div class="square middleHeight right middleRowRight"></div>')

                .append('<div class="square bottomHeight left bottomRowLeft"></div>')
                .append('<div class="square bottomHeight center bottomRowCenter"></div>')
                .append('<div class="square bottomHeight right bottomRowRight"></div>');

            this.get('contentBox')
                .append('<div id="gameMessage"></div>');
        },
        bindUI: function () {

            var that = this,

                markSquare = function (locationString) {

                    if ((that.get("currentTurn")) === 'x') {
                        that.set(locationString, 'x');
                    }
                },

                connectSquareClickToSquareValue = function (locationString) {
                    var boundThatMarkSquare = Y.bind(markSquare, that, locationString);
                    that.get('contentBox').delegate('click', boundThatMarkSquare, ("." + locationString));
                    that.after(locationString + 'Change', that.syncUI, that);
                },

                connectBoardClicksToSquareValues = function () {

                    connectSquareClickToSquareValue('topRowLeft');
                    connectSquareClickToSquareValue('topRowCenter');
                    connectSquareClickToSquareValue('topRowRight');

                    connectSquareClickToSquareValue('middleRowLeft');
                    connectSquareClickToSquareValue('middleRowCenter');
                    connectSquareClickToSquareValue('middleRowRight');

                    connectSquareClickToSquareValue('bottomRowLeft');
                    connectSquareClickToSquareValue('bottomRowCenter');
                    connectSquareClickToSquareValue('bottomRowRight');
                },

                convertWidgetBoardToBoardArrayForO = function () {

                    var widgetBoard = [[that.get('topRowLeft'), that.get('topRowCenter'), that.get('topRowRight')],
                                [that.get('middleRowLeft'), that.get('middleRowCenter'), that.get('middleRowRight')],
                                [that.get('bottomRowLeft'), that.get('bottomRowCenter'), that.get('bottomRowRight')]];

                    return widgetBoard;
                },

                convertXYMoveToWidgetBoard = function (XYArray) {
                    var widgetBoardLocation = {};
                    widgetBoardLocation["0,0"] = "topRowLeft";
                    widgetBoardLocation["0,1"] = "topRowCenter";
                    widgetBoardLocation["0,2"] = "topRowRight";

                    widgetBoardLocation["1,0"] = "middleRowLeft";
                    widgetBoardLocation["1,1"] = "middleRowCenter";
                    widgetBoardLocation["1,2"] = "middleRowRight";

                    widgetBoardLocation["2,0"] = "bottomRowLeft";
                    widgetBoardLocation["2,1"] = "bottomRowCenter";
                    widgetBoardLocation["2,2"] = "bottomRowRight";

                    return widgetBoardLocation[XYArray.toString()];

                },

                playOsTurn = function () {
                    var oBoardAI;
                    oBoardAI = that.makeBoardArrayFromSquareAttrs(convertWidgetBoardToBoardArrayForO());

                    if (oBoardAI.possibleMoveLocations(oBoardAI).length !== 0) {
                        that.set(convertXYMoveToWidgetBoard(oBoardAI.findMoveToMaximizeOsPerRow()), 'o');
                    }
                },

                changeTurn = function () {
                    if ((that.get("currentTurn")) === 'x') {
                        that.set("currentTurn", 'o');
                        playOsTurn();
                    } else {
                        that.set("currentTurn", 'x');
                    }
                },

                listenForClickAndChangeTurn = function (clickedSquare) {
                    that.after(clickedSquare + 'Change', function () {
                        changeTurn();
                    });
                },

                listenForAndChangeTurns = function () {
                    listenForClickAndChangeTurn('topRowLeft');
                    listenForClickAndChangeTurn('topRowCenter');
                    listenForClickAndChangeTurn('topRowRight');

                    listenForClickAndChangeTurn('middleRowLeft');
                    listenForClickAndChangeTurn('middleRowCenter');
                    listenForClickAndChangeTurn('middleRowRight');

                    listenForClickAndChangeTurn('bottomRowLeft');
                    listenForClickAndChangeTurn('bottomRowCenter');
                    listenForClickAndChangeTurn('bottomRowRight');
                },

                isTheGameOver = function () {

                    var board = that.makeBoardArrayFromSquareAttrs(convertWidgetBoardToBoardArrayForO()),
                        gameMessage;
                    if (board.checkGameTie(board) === true ||
                            board.checkGameWinForX(board) === true ||
                            board.checkGameWinForO(board) === true) {

                        gameMessage = Y.one('#gameMessage');

                        gameMessage.addClass('gameEnding');
                        gameMessage.show(true);


                    }
                },

                listenForPlayedTurn = function () {
                    var setSpaceChangeEvent = function (changingSquare) {
                        that.after(changingSquare + 'Change', isTheGameOver, that);
                    };
                    setSpaceChangeEvent('topRowLeft');
                    setSpaceChangeEvent('topRowCenter');
                    setSpaceChangeEvent('topRowRight');

                    setSpaceChangeEvent('middleRowLeft');
                    setSpaceChangeEvent('middleRowCenter');
                    setSpaceChangeEvent('middleRowRight');

                    setSpaceChangeEvent('bottomRowLeft');
                    setSpaceChangeEvent('bottomRowCenter');
                    setSpaceChangeEvent('bottomRowRight');

                };

            listenForAndChangeTurns();

            listenForPlayedTurn();

            connectBoardClicksToSquareValues();


        },
        syncUI: function () {
            var that = this,

                displaySquare = function (squareLocationString) {
                    if ((that.get(squareLocationString)) === 'x') {
                        that.get('contentBox').one('.' + squareLocationString).addClass('x').show(true);
                    }

                    if ((that.get(squareLocationString)) === 'o') {
                        that.get('contentBox').one('.' + squareLocationString).addClass('o').show(true);
                    }

                };

            displaySquare("topRowLeft");
            displaySquare("topRowCenter");
            displaySquare("topRowRight");

            displaySquare("middleRowLeft");
            displaySquare("middleRowCenter");
            displaySquare("middleRowRight");

            displaySquare("bottomRowLeft");
            displaySquare("bottomRowCenter");
            displaySquare("bottomRowRight");

        }

    }, {
        ATTRS: {

            currentTurn: {
                value: 'x'
            },

            topRowLeft: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('topRowLeft') === 'n') && ((square === 'o') || (square === 'x')));
                }
            },
            topRowCenter: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('topRowCenter') === 'n') && ((square === 'o') || (square === 'x')));
                }
            },
            topRowRight: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('topRowRight') === 'n') && ((square === 'o') || (square === 'x')));
                }
            },

            middleRowLeft: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('middleRowLeft') === 'n') && ((square === 'o') || (square === 'x')));
                }
            },
            middleRowCenter: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('middleRowCenter') === 'n') && ((square === 'o') || (square === 'x')));
                }
            },
            middleRowRight: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('middleRowRight') === 'n') && ((square === 'o') || (square === 'x')));
                }
            },

            bottomRowLeft: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('bottomRowLeft') === 'n') && ((square === 'o') || (square === 'x')));
                }
            },
            bottomRowCenter: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('bottomRowCenter') === 'n') && ((square === 'o') || (square === 'x')));
                }
            },
            bottomRowRight: {
                value: 'n',
                validator: function (square) {
                    return ((this.get('bottomRowRight') === 'n') && ((square === 'o') || (square === 'x')));
                }
            }
        }
    });

}, '0.0.1', { requires: [ 'base-build', 'widget', 'oop', 'array-extras', 'transition', 'node-event-delegate'] });
