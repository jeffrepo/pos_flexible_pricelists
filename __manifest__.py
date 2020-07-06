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
        'security/ir.model.access.csv',
        'views/templates.xml',
    ],
    'qweb': [
    ],
}
