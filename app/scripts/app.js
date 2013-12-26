// Author: Thiago Nascimento
// Filename: app.js

define(['jquery','underscore','backbone','router','bootstrap','spin','jqueryspin'], function($, _, Backbone, Router,Bootstrap){

  //Key to Google Fusion Table
  window.key = "AIzaSyC1CtwmY7TGSXaJ-54e67G2hupBQzSVxho"

  var initialize = function(){
    //All request by Google Fusion Table
    $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
      options.url = 'https://www.googleapis.com/fusiontables/v1/' + options.url;
      options.crossDomain = true;
    });

    $("#loading").spin().hide();
    //$(document).ajaxStart(function(){console.log("start"); $(this).fadeIn(); });
    //$(document).ajaxComplete(function(){ console.log("stop");$(this).fadeOut(); });

    $( document ).ajaxStart(function() {
      $("#loading").show();
    });

    $( document ).ajaxComplete(function() {
      $("#loading").hide();
    });

		// Pass in our Router module and call it's initialize function
    Router.initialize();    	      
  };

  return { 
  	initialize: initialize
  };
});
