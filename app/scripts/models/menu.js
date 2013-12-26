/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var MenuModel = Backbone.Model.extend({
    	urlRoot: 'menu.html',
        defaults: {

        }
    });

    return MenuModel;
});
