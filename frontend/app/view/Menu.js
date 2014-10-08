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
    cls: 'app-menu',

    layout: {
        type: 'vbox'
    },

    items: [
        {
            xtype: 'button',
            text: 'Головна',
            width: 200,
            pressed:true,
            toggleGroup:'menu',
            itemId: 'main-btn',
            icon:'resources/flower_8-512.png'
        },
        {
            xtype: 'button',
            text: 'Прихід',
            width: 200,
//            pressed:true,
            toggleGroup:'menu',
            itemId: 'income-btn',
            icon:'resources/goods_arrival-512.png'
        },
        {
            xtype: 'button',
            text: 'Продаж',
            toggleGroup:'menu',
            width: 200,
            itemId: 'sale-btn',
            icon:'resources/goods_return-512.png'

        },
        {
            xtype: 'button',
            text: 'Переоцінка',
            width: 200,
            toggleGroup:'menu',
            itemId: 'revaluation-btn',
            icon:'resources/dynamic_blue_right.png'

        },
        {
            xtype: 'button',
            text: 'Списання',
            width: 200,
            toggleGroup:'menu',
            itemId: 'write-off-btn',
            icon:'resources/Write.png'

        },
        {
            xtype: 'button',
            text: 'Залишок',
            width: 200,
            toggleGroup:'menu',
            itemId: 'balance-btn',
            icon:'resources/gr-org-icon.png'

        },
        {
            xtype: 'button',
            text: 'Виручка',
            width: 200,
            toggleGroup:'menu',
            itemId: 'revenue-btn',
            icon:'resources/Invest_128x128.png'

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
            width: 200,
            toggleGroup:'menu',
            itemId: 'add-category-btn',
            icon:'resources/plus_orange.png'

        }
//        {
//            xtype: 'button',
//            text: 'Редагути товари',
//            width: '13em',
//            itemId: 'update-category-btn'
//
//        }
    ],

    initComponent: function () {
        var me = this;
        me.callParent();
            }
});