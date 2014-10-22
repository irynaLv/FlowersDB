/**
 * Created by Iryna on 08.10.2014.
 */
Ext.define('FlowersDB.model.Balance', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'category', type: 'string'},
        { name: 'subcategory', type: 'string'},
        { name: 'name', type: 'string'},
        { name: 'type', type: 'string'},
        { name: 'description', type: 'string'},
        { name: 'counter', type: 'int'},
        { name: 'productId', type: 'int'},
        { name: 'shopId', type: 'int'},
        { name: 'incomeDate', type: 'Date'},
        { name: 'saleDate', type: 'Date'},
        { name: 'price', type: 'int'}
    ]
});