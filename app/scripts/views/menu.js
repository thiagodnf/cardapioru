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

                    var mom = moment(row[1]);
                    var itens = row[2].split(";");
                    
                    if(itens.length === 1 && itens[0] === "" ) itens = ['Cardápio não disponível'];

                    var menu_item = {date: mom.format('DD [de] MMMM'), itens: itens};
                    
                    if(mom.day() == 1) menu.seg = menu_item;
                    if(mom.day() == 2) menu.ter = menu_item;
                    if(mom.day() == 3) menu.qua = menu_item;
                    if(mom.day() == 4) menu.qui = menu_item;
                    if(mom.day() == 5) menu.sex = menu_item;
                    if(mom.day() == 6) menu.sab = menu_item;                                        
                });

                if(menu.ies !== null) document.title = menu.ies + " | Cardápio RU";

                that.$el.html(that.template(menu));

                //Colorir a cor do cardápio dependendo do dia atual
                if(moment().day() == 1) $("#segunda").removeClass("panel-primary").addClass('panel-success');
                if(moment().day() == 2) $("#terca").removeClass("panel-primary").addClass('panel-success');
                if(moment().day() == 3) $("#quarta").removeClass("panel-primary").addClass('panel-success');
                if(moment().day() == 4) $("#quinta").removeClass("panel-primary").addClass('panel-success');
                if(moment().day() == 5) $("#sexta").removeClass("panel-primary").addClass('panel-success');
                if(moment().day() == 6) $("#sabado").removeClass("panel-primary").addClass('panel-success'); 
            }).fail(function (x, status, error){
                that.$el.html(that.templateError({data: x}));                
            }).always(function(){
                $('body').removeClass('bs-docs-home');
            });            
        }
    });

    return MenuView;
});
