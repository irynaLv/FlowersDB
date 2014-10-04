/**
 * Created by Iryna on 15.09.2014.
 */
/**
 * Created by Iryna on 15.09.2014.
 */
Ext.define('FlowersDB.view.AddCategory', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'add-category',

    layout: {
        type: 'vbox'
    },

    hidden: true,
    itemId: 'new-product-container',
    items:[
        {
            xtype: 'textareafield',
            grow      : true,
            name      : 'description',
            fieldLabel: 'Опис',
            itemId:'description-field',
            renderTo: Ext.getBody()
        },
        {
            xtype: 'button',
            text:"Додати",
            itemId:'new-product-btn'
        }
    ]
});