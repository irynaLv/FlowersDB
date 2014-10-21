/**
 * Created by Iryna on 04.10.2014.
 */
Ext.define('FlowersDB.view.SaleContainer', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'sale-container',
    itemId: 'sale-container',
    cls: 'sale-container',

    layout: {
        type: 'vbox'
    },
    width: '100%',
    data: null,
    items: [

        {
            xtype: 'date-field'
        },


        {
            xtype:'container',
            layout:'hbox',
            items:[
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    name: 'bottles',
                    cls: 'input-field',
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
                    cls: 'input-field',
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
            xtype: 'button',
            text:"Проданий товар",
            itemId:'new-goods-btn-sale'
        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent();
        this.down('#quantity-field').on('blur', this.checkIfEmpty, this, this.down('#count-err'));
        this.down('#price-field').on('blur', this.checkIfEmpty, this, this.down('#price-err'));
    },
    checkIfEmpty: function( el,e, err){
        if(el.getValue() > 0){
            err.setVisible(false)
        }
    }
})
