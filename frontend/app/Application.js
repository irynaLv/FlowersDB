Ext.define('FlowersDB.Application', {
    name: 'FlowersDB',

    extend: 'Ext.app.Application',

    views:[
        'FlowersDB.view.Menu',
        'FlowersDB.view.MainContainer',
        'FlowersDB.view.ProductsBoxes',
        'FlowersDB.view.ShopBoxes',
        'FlowersDB.view.NumberInputField',
        'FlowersDB.view.AddCategory',
        'FlowersDB.view.IncomeContainer',
        'FlowersDB.view.SaleContainer',
        'FlowersDB.view.RevaluationContainer'
    ],

    controllers:[
        'FlowersDB.controller.Main'
    ],

    stores: [
        // TODO: add stores here
    ]
});
