/*global YUI */


YUI.add('tic-tac-toe-board', function (Y) {
    "use strict";

    Y.ticTacToeBoard = Y.Base.create('tic-tac-toe-board', Y.Widget, [], {

        NAME: "tic-tac-toe-board",

        initializer: function () {

        },
        makeBoardArrayFromSquareAttrs: function (transferredBoard) {

            var board = Y.clone(transferredBoard);

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

                        if ((Y.checkBoard.possibleMoveLocations(gameBoard)).length === 5) {
                            result = true;
                        }
                    }

                }

                return result;

            };

            board.findMoveForO = function (gameBoard) {

                var littleResult, bigResult;

                bigResult = Y.projectBoard.forNextTurnPossibilities(gameBoard, 'o');

                littleResult = Y.siftBoards.forWin(bigResult, 'o');
                bigResult = littleResult.length ? littleResult : bigResult;


                littleResult = Y.siftBoards.againstWin(bigResult, 'x');
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = Y.siftBoards.againstOneToWin(bigResult, 'x');
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = this.filterAgainstOppositeCornerHazardForO(bigResult);
                bigResult = littleResult[0] ? littleResult : bigResult;

                littleResult = Y.siftBoards.againstHighestTwoToWin(bigResult, 'x');
                bigResult = littleResult.length ? littleResult : bigResult;


                littleResult = Y.siftBoards.forHighestOneToWin(bigResult, 'o');
                bigResult = littleResult.length ? littleResult : bigResult;

                littleResult = Y.siftBoards.forHighestTwoToWins(bigResult, 'o');
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

                    if (Y.checkBoard.possibleMoveLocations(oBoardAI).length !== 0) {
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


                    if (Y.checkBoard.forWin(board, 'o') === true) {

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

}, '0.0.1', { requires: [ 'base-build', 'widget', 'oop', 'array-extras', 'transition', 'node-event-delegate', 'square-row-tools', 'get-strand', 'check-row', 'check-board', 'sift-boards', 'project-board'] });
