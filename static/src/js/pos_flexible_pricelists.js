odoo.define('pos_flexible_pricelists.pos_flexible_pricelists', function (require) {
"use strict";

var screens = require('point_of_sale.screens');
var models = require('point_of_sale.models');
var pos_db = require('point_of_sale.DB');
var rpc = require('web.rpc');
var gui = require('point_of_sale.gui');

//Carga de modelos
models.load_models({
    model: 'pos_flexible_pricelists.tarifa',
    fields: [],
    loaded: function(self,tarifas){
        self.tarifas_ids = tarifas
    },
});


var _super_order = models.Order.prototype;
models.Order = models.Order.extend({

    float_to_hour: function(num){
        var sign = num >= 0 ? 1 : -1;
        var min = 1 / 60;
        // Get positive value of num
        num = num * sign;
        // Separate the int from the decimal part
        var intpart = Math.floor(num);
        var decpart = num - intpart;
        // Round to nearest minute
        decpart = min * Math.round(decpart / min);
        var minutes = Math.floor(decpart * 60);
        // Sign result
        sign = sign == 1 ? '' : '-';
        // pad() adds a leading zero if needed
        // return sign + intpart + 'h' + pad(minutes, 2);
        return parseFloat(sign + intpart + '.' + minutes);
    },
    initialize: function(session, attributes) {
        var self = this;
        _super_order.initialize.apply(this,arguments);
        var today = new Date();
        var hora = today.getHours();
        var minuto = today.getMinutes();
        if( minuto.toString().length == 1){
            minuto = '0'+minuto
        }
        var dia = today.getDay();
        var horas = hora + '.' + minuto
        horas = parseFloat(horas);
        this.set_pricelist(attributes.pos.pricelists[0]);

        for (var i=0; i < attributes.pos.tarifas_ids.length ; i++){
            for (var j=0; j < attributes.pos.pricelists.length; j++){
                if(attributes.pos.tarifas_ids[i].config_id[0] == attributes.pos.config.id){
                    if (self.pos.tarifas_ids[i].dia == false){
                        self.pos.tarifas_ids[i].dia = 0;
                    }
                    if ( (horas > self.float_to_hour(attributes.pos.tarifas_ids[i].hora_inicio) && horas < self.float_to_hour(attributes.pos.tarifas_ids[i].hora_fin) ) && (attributes.pos.tarifas_ids[i].tarifa_id[0] == attributes.pos.pricelists[j].id) && (self.pos.tarifas_ids[i].dia == dia)){
                        this.set_pricelist(attributes.pos.pricelists[j]);
                    }
                }
            }
        }
    },
    add_product: function(product, options) {
        var self = this;
        var today = new Date();
        var hora = today.getHours();
        var minuto = today.getMinutes();
        if( minuto.toString().length == 1){
            minuto = '0'+minuto
        }

        var dia = today.getDay();

        var precio_lista_actual = this.pos.get_order().pricelist;
        var horas = hora + '.' + minuto
        horas = parseFloat(horas);
        // console.log(precio_lista_actual)

        for (var i=0; i < self.pos.tarifas_ids.length ; i++){
            for (var j=0; j < self.pos.pricelists.length; j++){
                if(self.pos.tarifas_ids[i].config_id[0] == this.pos.config.id){
                    if (self.pos.tarifas_ids[i].dia == false){
                        self.pos.tarifas_ids[i].dia = 0;
                    }

                    if ( (horas > self.float_to_hour(self.pos.tarifas_ids[i].hora_inicio) && horas < self.float_to_hour(self.pos.tarifas_ids[i].hora_fin) ) && (self.pos.tarifas_ids[i].tarifa_id[0] == self.pos.pricelists[j].id) && (self.pos.tarifas_ids[i].dia == dia )){
                        precio_lista_actual = self.pos.pricelists[j];
                    }
                }
            }
        }
        if (precio_lista_actual == this.pos.get_order().pricelist){
            _super_order.add_product.apply(this, [product, options]);
        }else{
            // this.set_pricelist(precio_lista_actual);
            this.pos.gui.show_popup('confirm',{
                'title': 'Está usando una tarifa no válida, se cambiará a una tarifa activa',
                'value': 1,
                'confirm': function(val) {
                    self.set_pricelist(precio_lista_actual);
                },
            });
        }
    }

})




});
