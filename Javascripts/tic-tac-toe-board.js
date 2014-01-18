/*global YUI */

YUI.add('tic-tac-toe-board', function (Y) {
    "use strict";

    Y.ticTacToeBoard = Y.Base.create('tic-tac-toe-board', Y.Widget, [], {

        NAME: "tic-tac-toe-board",

        initializer: function () {

        },
        makeBoardArrayFromSquareAttrs: function (transferredBoard) {

            var board = Y.clone(transferredBoard);

            board.projectAllPossibleBoardsThisTurn = function (arrayBoard, marker) {

                var makePossibleBoardList, 
                    futureBoard,
                    consideredPossibilityLocation,
                    i,
                    possibleBoardList = [];

                if (marker === undefined) {

                    marker = 'o';

                }

                makePossibleBoardList = function (usedArray) {

                    for (i = 0; i < Y.squareRowTools.possibleMoveLocations(usedArray).length; i += 1) {
                        futureBoard = Y.clone(usedArray);
                        consideredPossibilityLocation = Y.squareRowTools.possibleMoveLocations(usedArray)[i];
                        futureBoard[consideredPossibilityLocation[0]][consideredPossibilityLocation[1]] = marker;
                        possibleBoardList.push(futureBoard);
                    }

                        return possibleBoardList;
                };

                if (arrayBoard === undefined) {

                    return makePossibleBoardList(this);
                }

                return makePossibleBoardList(arrayBoard);
            };

            board.checkGameWinForX = function (gameBoard) {

                var win = false;
                if ((Y.squareRowTools.rowXCount(Y.getRow.column(0, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowXCount(Y.getRow.column(1, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowXCount(Y.getRow.column(2, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(0, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(1, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(2, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowXCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 3) ||
                        (Y.squareRowTools.rowXCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 3)) {
                    win = true;
                }

                return win;

            };

            board.checkGameWinForO = function (gameBoard) {

                var win = false;
                if ((Y.squareRowTools.rowOCount(Y.getRow.column(0, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowOCount(Y.getRow.column(1, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowOCount(Y.getRow.column(2, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(0, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(1, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(2, gameBoard)) === 3) ||
                        (Y.squareRowTools.rowOCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 3) ||
                        (Y.squareRowTools.rowOCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 3)) {
                    win = true;
                }

                return win;

            };

            board.twoToWinForO = function (gameBoard) {
                var twoToWinOccurrences = 0;
                if ((Y.squareRowTools.rowOCount(Y.getRow.column(0, gameBoard)) === 1) && (Y.squareRowTools.rowXCount(Y.getRow.column(0, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.getRow.column(1, gameBoard)) === 1) && (Y.squareRowTools.rowXCount(Y.getRow.column(1, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.getRow.column(2, gameBoard)) === 1) && (Y.squareRowTools.rowXCount(Y.getRow.column(2, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }
                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(0, gameBoard)) === 1) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(0, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(1, gameBoard)) === 1) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(1, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(2, gameBoard)) === 1) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(2, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 1) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 1) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                return twoToWinOccurrences;
            };



            board.twoToWinForX = function (gameBoard) {
                var twoToWinOccurrences = 0;
                if ((Y.squareRowTools.rowXCount(Y.getRow.column(0, gameBoard)) === 1) && (Y.squareRowTools.rowOCount(Y.getRow.column(0, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.getRow.column(1, gameBoard)) === 1) && (Y.squareRowTools.rowOCount(Y.getRow.column(1, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.getRow.column(2, gameBoard)) === 1) && (Y.squareRowTools.rowOCount(Y.getRow.column(2, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }
                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(0, gameBoard)) === 1) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(0, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(1, gameBoard)) === 1) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(1, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(2, gameBoard)) === 1) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(2, gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 1) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 1) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 0)) {
                    twoToWinOccurrences += 1;
                }

                return twoToWinOccurrences;
            };

            board.oneToWinForX = function (gameBoard) {
                var oneToWinOccurrences = 0;
                if ((Y.squareRowTools.rowXCount(Y.getRow.column(0, gameBoard)) === 2) && (Y.squareRowTools.rowOCount(Y.getRow.column(0, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.getRow.column(1, gameBoard)) === 2) && (Y.squareRowTools.rowOCount(Y.getRow.column(1, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.getRow.column(2, gameBoard)) === 2) && (Y.squareRowTools.rowOCount(Y.getRow.column(2, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }
                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(0, gameBoard)) === 2) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(0, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(1, gameBoard)) === 2) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(1, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(2, gameBoard)) === 2) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(2, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 2) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowXCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 2) && (Y.squareRowTools.rowOCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                return oneToWinOccurrences;
            };

            board.oneToWinForO = function (gameBoard) {
                var oneToWinOccurrences = 0;
                if ((Y.squareRowTools.rowOCount(Y.getRow.column(0, gameBoard)) === 2) && (Y.squareRowTools.rowXCount(Y.getRow.column(0, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.getRow.column(1, gameBoard)) === 2) && (Y.squareRowTools.rowXCount(Y.getRow.column(1, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.getRow.column(2, gameBoard)) === 2) && (Y.squareRowTools.rowXCount(Y.getRow.column(2, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }
                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(0, gameBoard)) === 2) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(0, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(1, gameBoard)) === 2) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(1, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getRow(2, gameBoard)) === 2) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getRow(2, gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 2) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getHighLeftDiagonal(gameBoard)) === 0)) {
                    oneToWinOccurrences += 1;
                }

                if ((Y.squareRowTools.rowOCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 2) && (Y.squareRowTools.rowXCount(Y.squareRowTools.getLowLeftDiagonal(gameBoard)) === 0)) {
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

            board.filterAgainstWinForO = function (arrayOfBoards) {

                var oBoardsNotWinning, checkNotGameWinForO;

                checkNotGameWinForO = function (gameBoard) {
                    return !this.checkGameWinForO(gameBoard);
                };

                oBoardsNotWinning = Y.Array.filter(arrayOfBoards, checkNotGameWinForO, this);
                return oBoardsNotWinning;

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


            board.filterAgainstOneToWinForO = function (arrayOfBoards) {


                var nonOneToWinOBoards;
                nonOneToWinOBoards = Y.Array.reject(arrayOfBoards, this.oneToWinForO, this);
                return nonOneToWinOBoards;

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
                }
                return minimalTwoToWinBoards;


            };


            board.filterAgainstHighestTwoToWinForO = function (arrayOfBoards, oRows) {

                var minimalTwoToWinBoards,
                    filterForCurrentNumberOfTwoToWinsPerBoard,
                    oRowDepth = oRows;

                if (oRowDepth === undefined) {
                    oRowDepth = 0;
                }

                filterForCurrentNumberOfTwoToWinsPerBoard = (function () {

                    return function (sameArrayOfBoards) {
                        return this.filterForNumberOfOTwoToWinsPerBoard(sameArrayOfBoards, oRowDepth);
                    };

                }());

                minimalTwoToWinBoards = Y.Array.filter(arrayOfBoards, filterForCurrentNumberOfTwoToWinsPerBoard, this);
                if ((minimalTwoToWinBoards.length === 0) &&  (oRowDepth !== 6)) {
                    return (this.filterAgainstHighestTwoToWinForO(arrayOfBoards, oRowDepth + 1));
                }
                return minimalTwoToWinBoards;
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


            board.filterAgainstOppositeCornerHazardForO = function (arrayOfBoards, player) {

                var oppositeCornerPlay = [];

                oppositeCornerPlay.push(Y.Array.find(arrayOfBoards, this.checkOppositeCornerHazardAgainstO));

                return oppositeCornerPlay;

            };


            board.checkOppositeCornerHazardAgainstO = function (gameBoard) {

                var result = false,
                    player = 'x',
                    opponent = 'o';

                if (((gameBoard[0][0] === player) && (gameBoard[2][2] === player))
                            || ((gameBoard[0][2] === player) && (gameBoard[2][0] === player))) {

                    if ((gameBoard[0][1] === opponent)
                            || (gameBoard[1][0] === opponent)
                            || (gameBoard[1][2] === opponent)
                            || (gameBoard[2][1] === opponent)) {

                        if ((Y.squareRowTools.possibleMoveLocations(gameBoard)).length === 5) {
                            result = true;
                        }
                    }

                }

                return result;

            };

            board.findMoveForO = function (gameBoard) {

                var littleResult, bigResult;

                bigResult = this.projectAllPossibleBoardsThisTurn(gameBoard);

                littleResult = this.filterForWinO(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;


                littleResult = this.filterAgainstWinForX(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = this.filterAgainstOneToWinForX(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = this.filterAgainstOppositeCornerHazardForO(bigResult);
                bigResult = littleResult[0] ? littleResult : bigResult;

                littleResult = this.filterAgainstHighestTwoToWinForX(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;


                littleResult = this.filterForHighestOneToWinForO(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = this.filterForHighestTwoToWinForO(bigResult);
                bigResult = littleResult.length ? littleResult : bigResult;


                return bigResult[0];

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

                    if (Y.squareRowTools.possibleMoveLocations(oBoardAI).length !== 0) {
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
                    if (Y.squareRowTools.checkGameTie(board) === true) {
                        gameMessage = Y.one('#gameMessage');

                        gameMessage.addClass('gameTie');
                        gameMessage.transition({
                            opacity: 0.90,
                            duration: 2.0,
                            easing: 'ease-in'
                        });


                    }


                    if (board.checkGameWinForO(board) === true) {

                        gameMessage = Y.one('#gameMessage');

                        gameMessage.addClass('gameLoss');
                        gameMessage.transition({
                            opacity: 0.90,
                            duration: 2.0,
                            easing: 'ease-in'
                        });
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

}, '0.0.1', { requires: [ 'base-build', 'widget', 'oop', 'array-extras', 'transition', 'node-event-delegate', 'square-row-tools', 'get-row'] });
