// Author: Thiago Nascimento
// Filename: app.js

define(['jquery','underscore','backbone','router','bootstrap','spin','jqueryspin'], function($, _, Backbone, Router,Bootstrap){

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
    $( document ).ajaxComplete(function() { $("#loading").hide(); });
    //setup ajax error handling
    $.ajaxError = function(x, status, error){
      console.log(x);
      console.log(status);
      console.log(error);
      /*if (x.status == 403) {
        console
                //window.location.href ="/Account/Login";
            }
            else {
                alert("An error occurred: " + status + "nError: " + error);
            }
        }*/
    };

		// Pass in our Router module and call it's initialize function
    Router.initialize();    	      
  };

  return { 
  	initialize: initialize
  };
});
