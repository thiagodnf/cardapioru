// Author: Thiago Nascimento
// Filename: app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'bootstrap',
  'spin',
  'jqueryspin',
  'util'
], function($, _, Backbone, Router,Bootstrap,Spin,jQSpin,u){

  //Key to Google Fusion Table
  window.key = "AIzaSyBD5rcWj2_fuugaOICorW1fVOrEFSErO4g"

  var initialize = function(){

    u.social()

    //All request by Google Fusion Table
    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
      options.url = 'https://www.googleapis.com/fusiontables/v1/' + options.url;
      options.crossDomain = true;
    });

    $("#loading").spin().hide();
    $( document ).ajaxStart(function() { $("#loading").show(); });
    $( document ).ajaxComplete(function() { $("#loading").hide(); });
    
		// Pass in our Router module and call it's initialize function
    Router.initialize();    	      
  };

  return { 
  	initialize: initialize
  };
});
