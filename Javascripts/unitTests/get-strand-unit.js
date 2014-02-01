/*global YUI */

YUI.add('get-strand-unit', function (Y) {

    "use strict";

    Y.namespace('getStrandUnit');

    Y.getStrandUnit.row = new Y.Test.Case({
        name: 'getStrand.row Unit Tests',

            'Y.getStrand.row should return a four item array for a four by three board': function () {

                var fourWideBoard = [['x', 'o', 'n', 'x'],
                                     ['n', 'n', 'n', 'n'],
                                     ['n', 'x', 'o', 'n']];

                Y.Assert.areSame(Y.getStrand.row(0, fourWideBoard).length, 4, 'getRow should count 4');


            }

    });


    Y.getStrandUnit.column = new Y.Test.Case({
        name: 'getStrand.column Unit Tests',

        'Y.getStrand.column should return a four item array for a three by four board': function () {

            var fourHighBoard = [['x', 'o', 'n'],
                                 ['n', 'n', 'n'],
                                 ['n', 'x', 'o'],
                                 ['n', 'o', 'n']];

            Y.Assert.areSame(Y.getStrand.column(0, fourHighBoard).length, 4, 'column should count 4');
        }

    });

    Y.getStrandUnit.highLeftDiagonal = new Y.Test.Case({
        name: 'getStrand.highLeftDiagonal Unit Tests',

            'Y.getStrand.highLeftDiagonal should return a four item array for a four by four board': function () {

                var fourWideFourTallBoard = [['x', 'o', 'n', 'x'],
                                             ['n', 'n', 'n', 'n'],
                                             ['n', 'x', 'o', 'n'],
                                             ['x', 'n', 'o', 'n']];

                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideFourTallBoard)[0], 'x', 'first should be x');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideFourTallBoard)[1], 'n', 'second should be n');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideFourTallBoard)[2], 'o', 'third should be o');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideFourTallBoard)[3], 'n', 'fourth should be n');
            },

            'Y.getStrand.highLeftDiagonal should return a three item array for a four by three board': function () {

                var fourWideThreeTallBoard = [['x', 'o', 'n', 'x'],
                                              ['n', 'n', 'n', 'n'],
                                              ['n', 'x', 'o', 'n']];

                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideThreeTallBoard)[0], 'x', 'first should be x');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideThreeTallBoard)[1], 'n', 'second should be n');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideThreeTallBoard)[2], 'o', 'third should be o');

                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideThreeTallBoard).length, 3, 'getColumn should count 3');
            },


            'Y.getStrand.highLeftDiagonal should return a three item array starting at the second column for a four by three board': function () {

                var fourWideThreeTallBoard = [['x', 'o', 'n', 'x'],
                                              ['n', 'n', 'n', 'n'],
                                              ['n', 'x', 'o', 'n']];

                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideThreeTallBoard, 1)[0], 'o', 'first should be x');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideThreeTallBoard, 1)[1], 'n', 'second should be n');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideThreeTallBoard, 1)[2], 'n', 'third should be o');

                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(fourWideThreeTallBoard, 1).length, 3, 'getColumn should count 3');
            },


            'Y.getStrand.highLeftDiagonal should return a three item array for a three by four board': function () {

                var threeWideFourTallBoard = [['x', 'o', 'n'],
                                              ['n', 'n', 'n'],
                                              ['n', 'x', 'o'],
                                              ['x', 'n', 'o']];

                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(threeWideFourTallBoard)[0], 'x', 'first should be x');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(threeWideFourTallBoard)[1], 'n', 'second should be n');
                Y.Assert.areSame(Y.getStrand.highLeftDiagonal(threeWideFourTallBoard)[2], 'o', 'third should be o');

                Y.Assert.areSame(3, Y.getStrand.highLeftDiagonal(threeWideFourTallBoard).length, 'getColumn should count 3');
            }

    });

}, '0.0.1', { requires: ['test', 'get-strand'] });
