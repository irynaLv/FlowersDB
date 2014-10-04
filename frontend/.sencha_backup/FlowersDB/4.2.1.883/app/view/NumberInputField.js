/**
 * Created by Iryna on 23.09.2014.
 */

Ext.define('FlowersDB.view.NumberInputField', {
    extend: 'Ext.container.Container',
    requires: [

    ],

    xtype: 'number-input-field',
    itemId: 'number-input-field',
    cls: 'number-input-field',

    layout: 'vbox',
    items:[

        {
            xtype:'container',
            layout: 'vbox',
            hidden: true,
            itemId: 'number-fields',
            items:[
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            name: 'bottles',
                            itemId: 'quantity-field',
                            fieldLabel: 'Кількість'
                        },
                        {
                            xtype: 'label',
                            itemId: 'count-err',
                            hidden: true,
                            text: 'Вкажіть кількість',
                            margin: '0 0 0 10'
                        }
                    ]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            itemId: 'price-field',
                            name: 'bottles',
                            fieldLabel: 'Ціна'
                        },
                        {
                            xtype: 'label',
                            itemId: 'price-err',
                            hidden: true,
                            text: 'Вкажіть ціну',
                            margin: '0 0 0 10'
                        }
                    ]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            itemId: 'prev-price-field',
                            name: 'bottles',
                            fieldLabel: 'Попередня ціна'
                        },
                        {
                            xtype: 'label',
                            itemId: 'price-err',
                            hidden: true,
                            text: 'Вкажіть попередню ціну',
                            margin: '0 0 0 10'
                        }
                    ]
                },

                {
                    xtype: 'button',
//                    disabled: true,
                    text:"Додати товар",
                    hidden: true,
                    itemId:'new-goods-btn-income'
                },
                {
                    xtype: 'button',
                    text:"Проданий товар",
//                    disabled: true,
                    hidden: true,
                    itemId:'new-goods-btn-sale'
                },
                {
                    xtype: 'button',
//                    disabled: true,
                    text:"Переоцінити товар",
                    hidden: true,
                    itemId:'new-goods-btn-revaluation'
                }
            ]

        }
    ],

    initComponent:function(){
        var me = this;
        me.callParent();

    }


});