/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var AboutView = Backbone.View.extend({
    	el: $("#page"),
        template: JST['app/scripts/templates/about.ejs'],

        render: function () {
            $('body').removeClass('bs-docs-home');
        	$('.nav li').removeClass('active');
        	$('#about').addClass('active');
        	this.$el.html(this.template);
        }
    });

    return AboutView;
});
