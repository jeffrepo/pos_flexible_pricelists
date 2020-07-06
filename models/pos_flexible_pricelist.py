# -*- encoding: utf-8 -*-

from odoo import models, fields, api, _
from datetime import timedelta
from dateutil import rrule
from odoo.tools.float_utils import float_compare

class PorFelxiblePricelists(models.Model):
    _name = 'pos_flexible_pricelists.tarifa'
    _rec_name = 'tarifa_id'

    tarifa_id = fields.Many2one('product.pricelist','Tarifa')
    dia = fields.Selection([(1, 'Lunes'),
                            (2, 'Martes'),
                            (3, 'Miercoles'),
                            (4, 'Jueves'),
                            (5, 'Viernes'),
                            (6, 'Sabado'),
                            (0, 'Domingo')])
    hora_inicio = fields.Float(string='Hora inicio')
    hora_fin = fields.Float(string='Hora fin')
    config_id = fields.Many2one('pos.config','Configuracion')
