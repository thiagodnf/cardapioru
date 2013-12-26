/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/menu'
], function ($, _, Backbone, JST,MenuModel) {
    'use strict';

    var MenuView = Backbone.View.extend({
    	el: $("#page"),
        template: JST['app/scripts/templates/menu.ejs'],
        template404: JST['app/scripts/templates/menu_404.ejs'],
        render: function (id) {
            id = _.escape(id);
            
            $('.nav li').removeClass('active');
            $('#all').addClass('active');

            var that = this;

            $.ajax({
                data: {sql: "select * from 13Dgj1T1eCzH_V82Wnm5g1CS2pmEUzsf_A49PF6I where restaurant_id = "+id+" order by date",key: window.key},
                url: "query",
                success: function(result){
                    if(result.rows == undefined){
                        that.$el.html(that.template404());
                    }else{
                        that.$el.html(that.template(result));
                    }
                },
                error: function(result){
                    that.$el.html(that.template404());
                },
                complete: function(msg){
                    $('body').removeClass('bs-docs-home');
                }
            });
        }
    });

    return MenuView;
});
