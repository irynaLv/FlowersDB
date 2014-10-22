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
    cls: 'balance-grid',
    store: 'balance',
    data:[],
    columnLines: true,
    height: 500,
    width: 680,

    defaults: {
        flex: 1
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
            xtype: 'textfield',
            itemId:'total-amount',
            fieldLabel: 'Загальна суму',
            editable:false
        }]
    }],

    initComponent: function () {
        this.totalAmount = 0;
        this.columns = [

            {
                xtype: 'rownumberer'
            },
            {
                text     : 'Категорія',
                width    : 80,
                sortable : true,
                dataIndex: 'category'
            }, {
                text     : 'Підкатегрія',
//                lockable: false,
                width    : 80,
                sortable : true,
                dataIndex: 'subcategory'
            }, {
                text     : 'Назва',
//            hidden   : true,
                width    : 80,
                sortable : true,
                dataIndex: 'name'
            }, {
                text     : 'Тип',
                width    : 80,
                sortable : true,
                dataIndex: 'type'
            },
            {
                text     : 'Кількість',
                width    : 60,
                sortable : true,
                dataIndex: 'counter'
            },
            {
                text     : 'Ціна',
                width    : 80,
                sortable : true,
                renderer: function(val){
                    return val + ' грн'
                },
                dataIndex: 'price'
            },
            {
                text     : 'Магазин',
                width    : 80,
                sortable : true,
                renderer : function(val) {
                    var record = Ext.getStore('shops').findRecord('shopId', val);
                    if(record){
                        val = record.data.address
                    }else{
                        val = "-"
                    }
                    return val;
                },
                dataIndex: 'shopId'
            },
            {
                text     : 'Сума',
                width    : 80,
                renderer : function(price, el, record) {
                    var counter = record.data.counter;
                    var val = price*counter;
//                    this.totalAmount +=val;
//                    this.down('#total-amount').setValue(this.totalAmount)
                    return val;
                },
                dataIndex: 'price'
            }
        ];


        this.store = Ext.getStore('FlowersDB.store.Balance');
        this.callParent();
        this.down('#total-amount').setValue(this.totalAmount);
        this.on('afterrender', this.setTotalAmount, this)
    },
    viewConfig: {
        stripeRows: true
    },

    setTotalAmount:function(){

    }
});