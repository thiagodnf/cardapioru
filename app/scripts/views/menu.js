/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'models/menu',
    'util',
    'moment',
    'momentptbr'
], function ($, _, Backbone, JST,MenuModel,u,moment) {
    'use strict';

    var MenuView = Backbone.View.extend({
    	el: $("#page"),
        template: JST['app/scripts/templates/menu.ejs'],
        templateError: JST['app/scripts/templates/error.ejs'],
        getRestaurantName: function(restaurant_id){
            return $.ajax({
                data: {sql: "select * from 13Dgj1T1eCzH_V82Wnm5g1CS2pmEUzsf_A49PF6I where restaurant_id = "+restaurant_id,key: window.key},
                url: "query"
            });
        },
        getItensMenu: function(restaurant_id){
            return $.ajax({
                data: {sql: "select * from 1Pv7LDx_fsBOIvi-ezd_7xYE5fa0dOZ4ZWx2VLSg where restaurant_id = "+restaurant_id+" order by date",key: window.key},
                url: "query"                
            });
        },
        render: function (id) {
            id = _.escape(id);

            $('.nav li').removeClass('active');
            $('#all').addClass('active');

            var that = this;

            $.when(this.getRestaurantName(id),this.getItensMenu(id)).done(function (rsRestaurantName,rsItensMenu) {
                var menu = {
                    ies: null,
                    seg: {date: "Data não disponível", itens: ['Cardápio não disponível']},
                    ter: {date: "Data não disponível", itens: ['Cardápio não disponível']},
                    qua: {date: "Data não disponível", itens: ['Cardápio não disponível']},
                    qui: {date: "Data não disponível", itens: ['Cardápio não disponível']},
                    sex: {date: "Data não disponível", itens: ['Cardápio não disponível']},
                    sab: {date: "Data não disponível", itens: ['Cardápio não disponível']}
                };

                var rowsRestaurantName = rsRestaurantName[0].rows;
                var rowsItensMenu = rsItensMenu[0].rows;

                if(rowsRestaurantName === undefined) rowsRestaurantName = [];
                if(rowsItensMenu === undefined) rowsItensMenu = [];
                    
                rowsRestaurantName.forEach(function(item){
                    menu.ies = item[2];
                });

                rowsItensMenu.forEach(function(row){
                    moment().lang("pt-br");

                    var d = new Date(row[1]);
                    var mom = moment(d);
                    var itens = row[2].split(";");
                    
                    if(itens.length === 1 && itens[0] === "" ) itens = ['Cardápio não disponível'];

                    var menu_item = {date: mom.format('DD [de] MMMM'), itens: itens};
                    
                    if(d.getDay() == 0) menu.seg = menu_item;
                    if(d.getDay() == 1) menu.ter = menu_item;
                    if(d.getDay() == 2) menu.qua = menu_item;
                    if(d.getDay() == 3) menu.qui = menu_item;
                    if(d.getDay() == 4) menu.sex = menu_item;
                    if(d.getDay() == 5) menu.sab = menu_item;                    
                });

                if(menu.ies !== null) document.title = menu.ies + " | Cardápio RU";

                that.$el.html(that.template(menu));
            }).fail(function (x, status, error){
                that.$el.html(that.templateError({data: x}));                
            }).always(function(){
                $('body').removeClass('bs-docs-home');
            });            
        }
    });

    return MenuView;
});
