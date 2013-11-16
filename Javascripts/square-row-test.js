/*node:true */

"use strict";

var YUI = require('yui').YUI;

YUI({
    modules: {
        'square-row-tools': {
            fullpath: './square-row-tools.js'
        }
    }
}).use('square-row-tools', 'test',  function (Y) {

    var emptyBoard = [['n', 'n', 'n'],
                      ['n', 'n', 'n'],
                      ['n', 'n', 'n']],


        fourByThreeOneXBoard  = [['n', 'n', 'n', 'n'],
                                 ['n', 'n', 'n', 'n'],
                                 ['x', 'n', 'n', 'n']],

        suite = new Y.Test.Suite("squareRowTools");

    suite.add(new Y.Test.Case({
        name: "getLine-test",

        setUp: function () {
        },

        tearDown: function () {
        },

        "squareRowTools.getLine should take a three by three board with no moves on it and return the first row when asked for it": function () {


            var emptyRow  = Y.squareRowTools.getLine(emptyBoard, '-', 0);

            Y.Assert.areEqual(emptyRow[0], 'n', 'Expected an empty Tic Tac Toe square');
            Y.Assert.areEqual(emptyRow[1], 'n', 'Expected an empty Tic Tac Toe square');
            Y.Assert.areEqual(emptyRow[2], 'n', 'Expected an empty Tic Tac Toe square');

        },

        "squareRowTools.getLine should take a four by three board with an x on the bottom left corner and return the first column when asked for it": function () {


            var xColumn  = Y.squareRowTools.getLine(fourByThreeOneXBoard, '|', 0);

            Y.Assert.areEqual(xColumn[0], 'n', 'Expected an X Tic Tac Toe square');
            Y.Assert.areEqual(xColumn[1], 'n', 'Expected an empty Tic Tac Toe square');
            Y.Assert.areEqual(xColumn[2], 'x', 'Expected an empty Tic Tac Toe square');
        },

        "squareRowTools.getLine should take a four by three board with an x on the bottom left corner and return the first row when asked for it": function () {


            var xColumn  = Y.squareRowTools.getLine(fourByThreeOneXBoard, '-', 0);

            Y.Assert.areEqual(xColumn[0], 'n', 'Expected an X Tic Tac Toe square');
            Y.Assert.areEqual(xColumn[1], 'n', 'Expected an empty Tic Tac Toe square');
            Y.Assert.areEqual(xColumn[2], 'n', 'Expected an empty Tic Tac Toe square');
            Y.Assert.areEqual(xColumn[3], 'x', 'Expected an empty Tic Tac Toe square');
        }

    }));

    Y.Test.Runner.add(suite);
    Y.Test.Runner.run();

});
