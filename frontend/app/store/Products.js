/**
 * Created by Iryna on 20.09.2014.
 */
Ext.define('FlowersDB.store.Products', {
    extend: 'Ext.data.Store',
    model: 'FlowersDB.model.Products',
    autoLoad: false,
    storeId: 'products',
    sorters: [{
        property: 'category',
        direction: 'ASC'
    }]
});