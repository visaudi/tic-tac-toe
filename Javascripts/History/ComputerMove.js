YUI.add('tic-tac-toe-computer-player', function (Y) {
    "use strict";

    Y.Base.create('computerPlayer', Y.Base, [], {
        initializer: function () {
            this.possibilities = []
            possibleMoveLocations = function () {

                var xOfBoard, yOfBoard;

                for (xOfBoard = 0; xOfBoard < 3; xOfBoard += 1) {
                    for (yOfBoard = 0; yOfBoard < 3; yOfBoard += 1) {

                        if (board[xOfBoard][yOfBoard] === 'n') {

                            possibilities.push([xOfBoard, yOfBoard]);


                        }
                    }
                }
            };
        });

    };
}, '0.0.1', { requires: [ 'base-build'] });