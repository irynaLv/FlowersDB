/**
 * Created by Iryna on 23.09.2014.
 */
Ext.define('FlowersDB.view.ShopBoxes', {
    extend: 'Ext.container.Container',
    requires: [

    ],

    xtype: 'shop-boxes',
    itemId: 'shop-boxes',
    cls: 'shop-boxes',

    layout: 'vbox',
    items:[
        {
            xtype: 'container',
            layout: 'hbox',
            items:[
                {
                    xtype: 'combobox',
                    fieldLabel: 'Магазин',
                    itemId: 'shop-field',
                    cls: 'input-field shop',
                    store: null,
                    editable: false,
                    queryMode: 'local',
                    displayField: 'address',
                    valueField: 'address',
                    renderTo: Ext.getBody()
                },
                {
                    xtype: 'label',
                    hidden: true,
                    itemId: 'shop-err',
                    cls: 'error',
                    text: 'Виберіть магазин',
                    margin: '0 0 0 10'
                }
            ]
        }
    ],

    initComponent:function(){
        var me = this;
        me.callParent();
        this.on('shopsloaded', this.showShops);
        this.down('#shop-field').on('change', this.onShopChange, this);
    },
    showShops: function(){
        this.shopStore = Ext.create('Ext.data.Store', {
            model: 'FlowersDB.model.Shops',
            storeId: 'shops',
            sorters: [{
                property: 'address',
                direction: 'ASC'
            }]
        })
        this.shopStore.loadData(this.shopData);
        this.down('#shop-field').setValue(null);
        this.down('#shop-field').bindStore(this.shopStore);
    },

    onShopChange: function(el, newValue){
        var typeRecord = this.down('#shop-field').findRecord('address', newValue);
        this.shopValue = typeRecord.data;
        this.down('#shop-err').setVisible(false);
    },

    checkData: function() {
        var isCorrect = true;
        if (!this.shopValue) {
            this.down('#shop-err').setVisible(true);
            isCorrect = false;
        }
        return isCorrect;

    }

});