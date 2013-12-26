/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/menu'
], function ($, _, Backbone, JST, MenuModel) {
    'use strict';

    var HomeView = Backbone.View.extend({
    	el: $("#page"),
        template: JST['app/scripts/templates/home.ejs'],
        render: function () {
            $('.nav li').removeClass('active');
            $('#home').addClass('active');
            $('body').addClass('bs-docs-home');
            this.$el.html(this.template);            
        }
    });

    return HomeView;
});
