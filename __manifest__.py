# -*- coding: utf-8 -*-
{
    'name': "POS Flexible Pricelist",

    'summary': """ pos flexible pricelist """,

    'description': """
        Pos flexible pricelist
    """,

    'author': "aquíH",
    'website': "http://www.aquih.com",

    'category': 'Uncategorized',
    'version': '0.1',

    'depends': ['point_of_sale'],

    'data': [
        'views/pos_config_view.xml',
        # 'views/pos_order_view.xml',
        # 'views/stock_production_lot_views.xml',
        # 'views/stock_quant_views.xml',
        # 'views/product_template_views.xml',
        # 'views/account_view.xml',
        # 'views/stock_picking_views.xml',
        # 'views/stock_move_views.xml',
        # 'views/report_envio.xml',
        # 'views/report_certificado_garantia.xml',
        # 'views/report_corte_caja.xml',
        'security/ir.model.access.csv',
        # 'data/paperformat_ticket.xml',
        # 'views/report.xml',
        'views/templates.xml',
        # 'views/report_invoice_contrasenia.xml',
    ],
    'qweb': [
        # 'static/src/xml/pos.xml',
    ],
}
