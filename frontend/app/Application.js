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
        'FlowersDB.view.RevaluationContainer',
        'FlowersDB.view.WriteOffContainer',
        'FlowersDB.view.BalanceContainer',
        'FlowersDB.view.RevenueContainer',
        'FlowersDB.view.DateField'
    ],

    controllers:[
        'FlowersDB.controller.Main'
    ],

    stores: [
        'Balance'
    ]
});
