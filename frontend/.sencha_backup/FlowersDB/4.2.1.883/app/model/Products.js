/**
 * Created by Iryna on 20.09.2014.
 */

Ext.define('FlowersDB.model.Products', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'category', type: 'string'},
        { name: 'subcategory', type: 'string'},
        { name: 'name', type: 'string'},
        { name: 'type', type: 'string'},
        { name: 'description', type: 'string'},
        { name: 'photoId', type: 'int'},
        { name: 'id', type: 'int'}

    ]
});