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
}, '0.0.1', { requires: ['test', 'get-strand'] });
