/**
 * Created by Iryna on 08.10.2014.
 */

Ext.define('FlowersDB.view.BalanceContainer', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'FlowersDB.view.BalanceGrid'
    ],

    xtype: 'balance-container',
    itemId: 'balance-container',
    cls: 'balance-container',

    layout: {
        type: 'hbox'
    },
    flex:1,
    width: '100%',
    items: [


        {
            xtype: 'button',
            text:"Залишок",
            itemId:'balance-btn'
        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }

})
