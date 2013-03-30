YUI.add('tic-tac-toe-board', function (Y) {
    "use strict";

    Y.ticTacToeBoard = Y.Base.create('tic-tac-toe-board', Y.Widget, [], {

        NAME: "tic-tac-toe-board",

        initializer: function () {

        },
        makeBoardArrayFromSquareAttrs: function (transferredBoard) {

            var board = Y.clone(transferredBoard.board),
                currentTurn = transferredBoard.currentTurn;

                board.projectAllPossibleBoardsThisTurn = function () {

                    var futureBoard,
                        consideredPossibilityLocation,
                        i,
                        possibleBoardList = [];

                    for (i = 0; i < board.possibleMoveLocations().length; i += 1) {
                        futureBoard = Y.clone(board);
                        consideredPossibilityLocation = board.possibleMoveLocations()[i];
                        futureBoard[consideredPossibilityLocation[0]][consideredPossibilityLocation[1]] = 'o';
                        possibleBoardList.push(futureBoard);
                        possibleBoardList.possibleMoveLocations = [];
                        possibleBoardList.possibleMoveLocations.push(consideredPossibilityLocation);
                    }
                    return possibleBoardList;
                };

            board.possibleMoveLocations = function () {

                var possibilities = [], x, y;

                for (x = 0; x < 3; x += 1) {
                    for (y = 0; y < 3; y += 1) {

                        if (this[x][y] === 'n') {

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

            board.findMoveToMaximizeOsPerRow = function () {

               var possibleBoardProjection = Y.clone(board.projectAllPossibleBoardsThisTurn()),
                    possibilityIndex = 0,
                    carefulness,
                    highestNumberOfOneOToWin,
                    highestNumberOfTwoOsToWin,
                    highestNumberOfTwoXsToWin,
                    that = this,
                    removePossibility = function (boardIndex) {
                        possibleBoardProjection = (function () {
                            var firstPart,
                                secondPart,
                                newTotal = [];
                            firstPart = possibleBoardProjection.slice(0, possibilityIndex);
                            secondPart = possibleBoardProjection.slice(possibilityIndex + 1, possibleBoardProjection.length);
                            newTotal= [].concat(firstPart, secondPart);

                            return newTotal;
                        }())
                    },

                    convertPossibilityToMove = function () {
                        var x, y;

                        for (x = 0; x < 3; x += 1) {
                            for (y = 0; y < 3; y +=1) {
                                if (that[x][y] !== possibleBoardProjection[0][x][y]) {
                                   return [x, y];
                                }
                            }
                        } 
                    };

                    
                highestNumberOfOneOToWin = 0;
                highestNumberOfTwoOsToWin = 0;
                highestNumberOfTwoXsToWin = 8;
                for (possibilityIndex = 0; possibilityIndex < possibleBoardProjection.length; possibilityIndex += 1) {
                    if (that.checkGameWinForO(possibleBoardProjection[possibilityIndex]) === true) {
                        possibleBoardProjection = [].push(possibleBoardProjection[possibilityIndex]);

                    } else {

                        if (that.oneToWinForX(possibleBoardProjection[possibilityIndex]) >=  1) {
                            removePossibility(possibilityIndex);
                            possibilityIndex -= 1;
                        }

                    }
                }


                if (possibleBoardProjection.length > 1) {

                    for (carefulness = 0; carefulness < 2; carefulness += 1) {

                        for (possibilityIndex = 0; possibilityIndex < possibleBoardProjection.length; possibilityIndex += 1) {
                            if (that.twoToWinForX(possibleBoardProjection[possibilityIndex]) <=  highestNumberOfTwoXsToWin) {
                                highestNumberOfTwoXsToWin = this.twoToWinForX(possibleBoardProjection[possibilityIndex]);
                            } else {
                                removePossibility(possibilityIndex);
                                possibilityIndex -=1;
                            }
                        }
                    }
                }

                if (possibleBoardProjection.length > 1) {
                    for (carefulness = 0; carefulness < 2; carefulness += 1) {
                        for (possibilityIndex = 0; possibilityIndex < possibleBoardProjection.length; possibilityIndex += 1) {
                            if (this.oneToWinForO(possibleBoardProjection[possibilityIndex]) >= highestNumberOfOneOToWin) {
                                highestNumberOfOneOToWin = this.oneToWinForO(possibleBoardProjection[possibilityIndex]);
                            } else {
                                removePossibility(possibilityIndex);
                                possibilityIndex -= 1;
                            }
                        }
                    }
                }


                if (possibleBoardProjection.length > 1) {
                    for (carefulness = 0; carefulness < 2; carefulness += 1) {
                        for (possibilityIndex = 0; possibilityIndex < possibleBoardProjection.length; possibilityIndex += 1) {
                            if (this.twoToWinForO(possibleBoardProjection[possibilityIndex]) >= highestNumberOfTwoOsToWin) {
                                highestNumberOfTwoOsToWin = this.twoToWinForO(possibleBoardProjection[possibilityIndex]);
                            } else {
                                removePossibility(possibilityIndex);
                                possibilityIndex -= 1;
                            }
                        }
                    }
                }

Y.log(convertPossibilityToMove());
                return possibleBoardProjection[0];
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
                .append('<h1 id="gameMessage">Game Over</h1>');
        },
        bindUI: function () {

            var that = this,

                markSquare = function (locationString) {

                    if ((that.get("currentTurn")) === 'x') {
                        that.set(locationString, 'x');
                    } else {
                        that.set(locationString, 'o');
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

                convertWidgetBoardToBoardArray = function () {

                    var widgetBoard = [[that.get('topRowLeft'), that.get('topRowCenter'), that.get('topRowRight')],
                                [that.get('middleRowLeft'), that.get('middleRowCenter'), that.get('middleRowRight')],
                                [that.get('bottomRowLeft'), that.get('bottomRowCenter'), that.get('bottomRowRight')]],

                        widgetCurrentTurn = that.get('currentTurn');
                    return {board: widgetBoard, currentTurn: widgetCurrentTurn};
                },

                changeTurn = function () {
                    if ((that.get("currentTurn")) === 'x') {
                        that.set("currentTurn", 'o');
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

                    var board = that.makeBoardArrayFromSquareAttrs(convertWidgetBoardToBoardArray());
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

}, '0.0.1', { requires: [ 'base-build', 'widget', 'oop', 'transition', 'node-event-delegate'] });
