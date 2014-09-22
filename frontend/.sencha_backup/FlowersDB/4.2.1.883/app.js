/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/
Ext.Loader.setConfig({
    disableCaching: false
});

Ext.application({
    name: 'FlowersDB',

    extend: 'FlowersDB.Application',
    
    autoCreateViewport: true,

    views:[
        'FlowersDB.view.Menu',
        'FlowersDB.view.MainContainer',
        'FlowersDB.view.AddCategory'
    ],
    controllers:[
        'FlowersDB.controller.Main'
    ]
//    stores:[
//        'Products'
//    ],
//    models:[
//        'Products'
//    ]
});