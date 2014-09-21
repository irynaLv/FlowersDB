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

    items: [
        {
            xtype: 'toolbar',
            cls: 'toolbar-flower',
            height: '4em',
            region: 'north'
        },
        {
        region: 'west',
        xtype: 'app-menu',

        width: 200
    },{
        region: 'center',
        xtype: 'app-main-container'

    }]
});