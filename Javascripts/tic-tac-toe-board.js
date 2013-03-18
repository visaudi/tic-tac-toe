YUI.add('tic-tac-toe-board', function (Y) {
    "use strict";

    Y.ticTacToeBoard = Y.Base.create('tic-tac-toe-board', Y.Widget, [], {

        NAME: "tic-tac-toe-board",

        initializer: function () {

        },
        makeBoardArrayFromSquareAttrs: function () {

            var board = [[this.get('topRowLeft'), this.get('topRowCenter'), this.get('topRowRight')],
                        [this.get('middleRowLeft'), this.get('middleRowCenter'), this.get('middleRowRight')],
                        [this.get('bottomRowLeft'), this.get('bottomRowCenter'), this.get('bottomRowRight')]];

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

            board.getColumn = function (columnPosition) {

                var x, column = [];

                for (x = 0; x < 3; x += 1) {

                    column[x] = this[x][columnPosition];


                }

                return column;


            };

            board.getRow = function (rowPosition) {

                var y, extractedRow = [];

                for (y = 0; y < 3; y += 1) {

                    extractedRow[y] = this[rowPosition][y];


                }

                return extractedRow;

            };

            board.getHighLeftDiagonal = function () {

                var xAndY, diagonal = [];

                for (xAndY = 0; xAndY < 3; xAndY += 1) {

                    diagonal[xAndY] = this[xAndY][xAndY];

                }

                return diagonal;

            };

            board.getLowLeftDiagonal = function () {

                var x, y = 2, diagonal = [];


                for (x = 0; x < 3; x += 1) {
                    diagonal[x] = this[y][x];

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

                    console.log(that.makeBoardArrayFromSquareAttrs());
                    var boardTest = that.makeBoardArrayFromSquareAttrs();
                    console.log(boardTest.getLowLeftDiagonal());
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

}, '0.0.1', { requires: [ 'base-build', 'widget', 'transition', 'node-event-delegate'] });
