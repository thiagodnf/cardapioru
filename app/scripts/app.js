// Author: Thiago Nascimento
// Filename: app.js

define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'bootstrap',
  'spin',
  'jqueryspin'
], function($, _, Backbone, Router,Bootstrap,Spin,jQSpin){

  //Key to Google Fusion Table
  window.key = "AIzaSyBD5rcWj2_fuugaOICorW1fVOrEFSErO4g"

  var initialize = function(){

    //All request by Google Fusion Table
    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
      options.url = 'https://www.googleapis.com/fusiontables/v1/' + options.url;
      options.crossDomain = true;
    });

    $("#loading").spin().hide();
    $( document ).ajaxStart(function() { $("#loading").show(); });
    $( document ).ajaxStop(function() { $("#loading").hide(); });
    
		// Pass in our Router module and call it's initialize function
    Router.initialize();    	      
  };

  return { 
  	initialize: initialize
  };
});
