/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',    
    'models/restaurant'
], function ($, _, Backbone, JST, RestaurantModel) {
    'use strict';

    var MenusView = Backbone.View.extend({
    	el: $("#page"),
        template: JST['app/scripts/templates/all.ejs'],
        templateError: JST['app/scripts/templates/error.ejs'],
        render: function () {
            $('.nav li').removeClass('active');
            $('#all').addClass('active');
            
            var that = this;

            $.ajax({
                data: {sql: "select restaurant_id,ies,name from 13Dgj1T1eCzH_V82Wnm5g1CS2pmEUzsf_A49PF6I group by restaurant_id,ies,name",key: window.key},
                url: "query",
                success: function(result){
                    var restaurant = new Array();
                    var array = {};

                    result.rows.forEach(function (item) { 
                        if (!(item[1] in array)){ 
                            array[item[1]] = new Array(); 
                        }
                        array[item[1]].push({"restaurant_id": item[0] ,name:item[2]}); 
                    });
                    
                    that.$el.html(that.template({data: array}));
                },
                error: function(x, status, error){
                    that.$el.html(that.templateError({data: x}));
                },
                complete: function(msg){
                    $('body').removeClass('bs-docs-home');
                }
            });
            
        }
    });

    return MenusView;
});
