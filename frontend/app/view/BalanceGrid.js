/**
 * Created by Iryna on 08.10.2014.
 */
Ext.define('FlowersDB.view.BalanceGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.RowNumberer',
        'FlowersDB.store.Products'
    ],
    xtype: 'balance-grid',
    itemId: 'balance-grid',
    store: 'balance',
    data:[],
    columnLines: true,
    height: 350,
    width: 600,
    title: 'Залишок',
    viewConfig: {
        stripeRows: true
    },


    initComponent: function () {
        this.columns = [{
            xtype: 'rownumberer'
        }, {
            text     : 'Категорія',
            locked   : true,
            width    : 80,
            sortable : false,
            dataIndex: 'category'
        }, {
            text     : 'Підкатегрія',
            lockable: false,
            width    : 80,
            sortable : true,
//            renderer : 'usMoney',
            dataIndex: 'subcategory'
        }, {
            text     : 'Назва',
//            hidden   : true,
            width    : 80,
            sortable : false,
//            renderer : function(val) {
//                return Math.round(val * 3.14 * 100) / 10;
//            },
            dataIndex: 'name'
        }, {
            text     : 'Тип',
            width    : 80,
            sortable : true,
//            renderer : function(val) {
//                if (val > 0) {
//                    return '<span style="color:green;">' + val + '</span>';
//                } else if (val < 0) {
//                    return '<span style="color:red;">' + val + '</span>';
//                }
//                return val;
//            },
            dataIndex: 'type'
        },
            {
            text     : 'Кількість',
            width    : 105,
            sortable : true,
//            renderer : function(val) {
//                if (val > 0) {
//                    return '<span style="color:green;">' + val + '%</span>';
//                } else if (val < 0) {
//                    return '<span style="color:red;">' + val + '%</span>';
//                }
//                return val;
//            },
            dataIndex: 'counter'
        },
            {
                text     : 'Магазин',
                width    : 80,
                sortable : true,
//            renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'shop'
            },
            {
                text     : 'Ціна',
                width    : 80,
                sortable : true,
//            renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'price'
            }];


        this.callParent();
        this.store = Ext.getStore('FlowersDB.store.Products');
    }
});