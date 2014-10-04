/**
 * Created by Iryna on 04.10.2014.
 */
Ext.define('FlowersDB.view.IncomeContainer', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'income-container',
    itemId: 'income-container',
    cls: 'income-container',

    layout: {
        type: 'vbox'
    },
    flex:1,
    width: '100%',
//    renderTo: Ext.getBody(),
    items: [

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
            text:"Додати товар",
            itemId:'new-goods-btn-income'
        }
],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        this.down('#quantity-field').on('blur', this.checkIfEmpty, this, this.down('#count-err'));
        this.down('#price-field').on('blur', this.checkIfEmpty, this, this.down('#price-err'));
    },
    checkIfEmpty: function( el,e, err){
        if(el.getValue() > 0){
            err.setVisible(false)
        }
    }

})
