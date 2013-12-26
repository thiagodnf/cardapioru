/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var CommentsView = Backbone.View.extend({
    	el: $("#page"),
        template: JST['app/scripts/templates/comments.ejs'],

        render: function () {
            $('body').removeClass('bs-docs-home');
        	$('.nav li').removeClass('active');
        	$('#comments').addClass('active');
        	this.$el.html(this.template);
        }
    });

    return CommentsView;
});
