/*global YUI */

YUI.add('project-board', function (Y) {

    "use strict";

    Y.namespace('projectBoard');

    Y.projectBoard.forNextTurnPossibilities = function (arrayBoard, marker) {

        var makePossibleBoardList,
            futureBoard,
            consideredPossibilityLocation,
            i,
            possibleBoardList = [];

        if (marker === undefined) {

            marker = 'o';

        }

        for (i = 0; i < Y.checkBoard.possibleMoveLocations(arrayBoard).length; i += 1) {
            futureBoard = Y.clone(arrayBoard);
            consideredPossibilityLocation = Y.checkBoard.possibleMoveLocations(arrayBoard)[i];
            futureBoard[consideredPossibilityLocation[0]][consideredPossibilityLocation[1]] = marker;
            possibleBoardList.push(futureBoard);
        }

        console.log(possibleBoardList);
        return possibleBoardList;


    };

}, '0.0.1', { requires: ['check-board'] });
