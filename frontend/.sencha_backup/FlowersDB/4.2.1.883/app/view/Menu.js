/**
 * Created by Iryna on 15.09.2014.
 */
Ext.define('FlowersDB.view.Menu', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'app-menu',

    layout: {
        type: 'vbox'
    },

    items: [
        {
            xtype: 'button',
            text: 'Прихід',
            itemId: 'income-btn'

        },
        {
            xtype: 'button',
            text: 'Прихід',
            itemId: 'sale-btn'

        },
        {
            xtype: 'button',
            text: 'Переоцінка',
            itemId: 'revaluation-btn'

        },
        {
            xtype: 'button',
            text: 'Залишок',
            itemId: 'remainder-btn'

        },
        {
            xtype: 'button',
            text: 'Виручка',
            itemId: 'revenue-btn'

        },
        {
            xtype: 'button',
            text: 'Звіти',
            itemId: 'income-btn'

        },
        {
            xtype: 'button',
            text: 'Додати категорію товарів',
            itemId: 'add-category-btn'

        },
        {
            xtype: 'button',
            text: 'Редагути товари',
            itemId: 'update-category-btn'

        },
    ]
});