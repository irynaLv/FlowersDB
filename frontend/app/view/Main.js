Ext.define('FlowersDB.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'app-main',
    itemId: 'app-main',
    cls: 'app-main',


    layout: {
        type: 'border'
    },
//    layout: 'fit',
    minWidth: 960,
    minHeight: 600,
    items: [
        {
            xtype: 'toolbar',
            cls: 'toolbar-flower',
            height: '10em',
            region: 'north'
        },
        {
            region: 'west',
            xtype: 'app-menu',
            width: 200
        },
        {
            width: '70%',
            flex: 1,
            height:'80%',
            xtype: 'app-main-container'

        }]
});