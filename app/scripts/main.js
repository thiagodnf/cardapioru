/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        typeahead: '../bower_components/typeahead.js/dist/typeahead',
        spin: '../bower_components/spin.js/dist/spin',
        jqueryspin: '../bower_components/spin.js/jquery.spin'
    }
});

require([
    'backbone',
    'app'
], function (Backbone,App) {
    //Backbone.history.start();
    App.initialize();
});
