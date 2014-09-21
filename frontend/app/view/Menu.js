/**
 * Created by Iryna on 13.09.2014.
 */
Ext.define('FlowersDB.view.Menu', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'app-menu',
    itemId: 'app-menu',

    layout: {
        type: 'vbox'
    },

    items: [
        {
            xtype: 'button',
            text: 'Прихід',
            width: '13em',
            itemId: 'income-btn'

        },
        {
            xtype: 'button',
            text: 'Продаж',
            width: '13em',
            itemId: 'sale-btn'

        },
        {
            xtype: 'button',
            text: 'Переоцінка',
            width: '13em',
            itemId: 'revaluation-btn'

        },
        {
            xtype: 'button',
            text: 'Залишок',
            width: '13em',
            itemId: 'remainder-btn'

        },
        {
            xtype: 'button',
            text: 'Виручка',
            width: '13em',
            itemId: 'revenue-btn'

        },
//        {
//            xtype: 'button',
//            text: 'Звіти',
//            width: '13em',
//            itemId: 'btn'
//
//        },
        {
            xtype: 'button',
            text: 'Додати категорію товарів',
            width: '13em',
            itemId: 'add-category-btn'

        },
        {
            xtype: 'button',
            text: 'Редагути товари',
            width: '13em',
            itemId: 'update-category-btn'

        }
    ],

    initComponent: function () {
        var me = this;
        me.callParent();
            }
});