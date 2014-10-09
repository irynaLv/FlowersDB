/**
 * Created by Iryna on 08.10.2014.
 */
Ext.define('FlowersDB.store.Balance', {
    extend: 'Ext.data.Store',
    model: 'FlowersDB.model.Balance',
    autoLoad: false,
    storeId: 'balance',
    sorters: [{
        property: 'category',
        direction: 'ASC'
    }]

});