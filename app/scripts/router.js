// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home',
  'views/menu',
  'views/all',
  'views/comments',
  'views/about',  
], function($, _, Backbone, HomeView, MenuView, AllView, CommentsView, AboutView) {

  var title = 'Cardápio RU';
  
  var AppRouter = Backbone.Router.extend({
    routes: { // Define some URL routes      
      'about': 'showAbout',
      'home': 'showHome',
      'comments': 'showComments',
      'menu/:id': 'showMenu',
      'all': 'showAll',
      '*actions': 'defaultAction' // Default
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:showAbout', function(){
      document.title = "Sobre" + " | " + title;
      var view = new AboutView();
      view.render();        
    });

    app_router.on('route:showMenu', function(id){
      document.title = "Cardápio" + " | " + title;
      var view = new MenuView();
      view.render(id);        
    });

    app_router.on('route:showAll', function(id){
      document.title = "Todos os Cardápios" + " | " + title;
      var view = new AllView();
      view.render();        
    });

    app_router.on('route:showComments', function(){
      document.title = "Comentários" + " | " + title;
      var view = new CommentsView();
      view.render();        
    });

    app_router.on('route:showHome', function(){
       document.title = "Inicio" + " | " + title;
      var view = new HomeView();
      view.render();
    });
    
    app_router.on('route:defaultAction', function (actions) {
      document.title = "Inicio" + " | " + title;
      var view = new HomeView();
      view.render();
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
