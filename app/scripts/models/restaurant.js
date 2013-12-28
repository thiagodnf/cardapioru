/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var RestaurantModel = Backbone.Model.extend({
    	urlRoot: 'query?sql=select * from 13Dgj1T1eCzH_V82Wnm5g1CS2pmEUzsf_A49PF6I group by restaurant_id,ies,name&key='+window.key
    });

    return RestaurantModel;
});
