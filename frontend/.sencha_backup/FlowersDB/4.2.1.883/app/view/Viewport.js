Ext.define('FlowersDB.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'FlowersDB.view.Main'
    ],
    xtype: 'viewport',

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'app-main'
    }]
});
