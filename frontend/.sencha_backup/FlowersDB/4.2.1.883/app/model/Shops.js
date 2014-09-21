/**
 * Created by Iryna on 20.09.2014.
 */

Ext.define('FlowersDB.model.Shops', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'address', type: 'string'},
        { name: 'description', type: 'string'},
        { name: 'photoId', type: 'int'},
        { name: 'shopId', type: 'int'}

    ]
});