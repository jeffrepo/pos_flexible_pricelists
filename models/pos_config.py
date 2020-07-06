# -*- encoding: utf-8 -*-

from openerp import models, fields, api, _
from datetime import timedelta
from dateutil import rrule
from odoo.tools.float_utils import float_compare

class PosConfig(models.Model):
    _inherit = 'pos.config'

    tarifas_ids = fields.One2many('pos_flexible_pricelists.tarifa','config_id', string="Tarifas")
