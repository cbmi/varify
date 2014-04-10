/* global define */

define([
    'underscore',
    './workflows/analysis',
    './workflows/results'
], function(_) {

    var mods = [].slice.call(arguments, 1);

    return _.extend.apply(null, [{}].concat(mods));

});