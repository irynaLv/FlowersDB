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

    items: [
        {
            xtype: 'container',
            layout:'hbox',
            items:[
                {
                    xtype: 'combobox',
                    fieldLabel: 'Категорія',
                    store: null,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    renderTo: Ext.getBody()
                },
                {
                    xtype:'button',
                    text:'+'
                }
            ]
        },
        {
            xtype: 'container',
            layout:'hbox',
            items:[
                {
                    xtype: 'combobox',
                    fieldLabel: 'Вид',
                    store: null,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'abbr',
                    renderTo: Ext.getBody()
                },
                {
                    xtype:'button',
                    text:'+'
                }
            ]
        },




        {
            xtype: 'combobox',
            fieldLabel: 'Колір',
            store: null,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
            renderTo: Ext.getBody()
        },
        {
            xtype: 'combobox',
            fieldLabel: 'Тип',
            store: null,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
            renderTo: Ext.getBody()
        },
        {
            xtype: 'numberfield',
            anchor: '100%',
            name: 'bottles',
            fieldLabel: 'Кількість'
        },
        {
            xtype: 'numberfield',
            anchor: '100%',
            name: 'bottles',
            fieldLabel: 'Ціна'
        }

    ]
});