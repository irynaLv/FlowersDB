/**
 * Created by Iryna on 17.10.2014.
 */

Ext.define('FlowersDB.view.RevenueContainer', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'revenue-container',
    itemId: 'revenue-container',
    cls: 'revenue-container',

    layout: {
        type: 'vbox'
    },
    flex:1,
    width: '100%',
//    renderTo: Ext.getBody(),
    items: [
        {
            xtype: 'date-field'
        },
        {
            xtype:'datefield',
            fieldLabel: 'To',
            name: 'date_from',
//            id: 'date_from_id',
            readOnly: true,
            allowBlank:false,
            format:'d/m/Y',
            value: new Date()
        },

        {
            xtype: 'button',
            text:"Виручка",
            itemId:'revenue-btn'
        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
//        this.down('#quantity-field').on('blur', this.checkIfEmpty, this, this.down('#count-err'));
//        this.down('#price-field').on('blur', this.checkIfEmpty, this, this.down('#price-err'));
    }

})
