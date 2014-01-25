/*global YUI */

YUI.add('test-mod', function (Y) {

    "use strict";

    Y.namespace('testMod');

    Y.testMod.testTestCase = new Y.Test.Case({
        name: 'testing Test',

        '1 should equal 2': function () {
            Y.Assert.areSame(1, 3, '1 should equal 2');
        }

    });

}, '0.0.1', { requires: ['test'] });
