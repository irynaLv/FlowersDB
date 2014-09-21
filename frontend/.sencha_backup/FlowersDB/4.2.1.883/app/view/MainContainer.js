/**
 * Created by Iryna on 15.09.2014.
 */
Ext.define('FlowersDB.view.MainContainer', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'app-main-container',
    itemId: 'app-main-container',

    layout: {
        type: 'vbox'
    },
    data: null,
    items: [

        {
            xtype: 'combobox',
            fieldLabel: 'Магазин',
            itemId: 'shop-field',
            store: null,
            queryMode: 'local',
            displayField: 'address',
            valueField: 'address',
            renderTo: Ext.getBody()
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'category-field',
                    fieldLabel: 'Категорія',
                    store:null,
                    queryMode: 'local',
                    displayField: 'category',
                    valueField: 'category',
                    renderTo: Ext.getBody()
                }
            ]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Підкатегорія',
                    itemId: 'subcategory-field',
                    store: null,
                    queryMode: 'local',
                    displayField: 'subcategory',
                    valueField: 'subcategory',
                    renderTo: Ext.getBody()
                }
            ]
        },

        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'name-field',
                    fieldLabel: 'Назва',
                    store: null,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    renderTo: Ext.getBody()
                }

            ]
        },

        {
            xtype: 'container',
            layout: 'hbox',
            items: [
                {
                    xtype: 'combobox',
                    itemId: 'type-field',
                    fieldLabel: 'Тип',
                    store: null,
                    queryMode: 'local',
                    displayField: 'type',
                    valueField: 'type',
                    renderTo: Ext.getBody()
                }
            ]
        },
        {
            xtype:'container',
            layout: 'vbox',
//            hidden: true,
            itemId: 'number-fields',
            items:[
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    name: 'bottles',
                    itemId: 'quantity-field',
                    fieldLabel: 'Кількість'
                },
                {
                    xtype: 'numberfield',
                    anchor: '100%',
                    itemId: 'price-field',
                    name: 'bottles',
                    fieldLabel: 'Ціна'
                },
                {
                    xtype: 'button',
                    text:"Додати",
                    itemId:'new-goods-btn'
                }
            ]
        },

        {
            xtype:'container',
            layout: 'vbox',
            hidden: true,
            itemId: 'new-goods-container',
            items:[
                {
                    xtype: 'textareafield',
                    grow      : true,
                    name      : 'description',
                    fieldLabel: 'Опис',
                    itemId:'description-field',
                    renderTo: Ext.getBody()
                },
                {
                    xtype: 'button',
                    text:"Додати",
                    itemId:'new-product-btn'
                }
            ]
        }


    ],
    initComponent: function () {
        var me = this;
        me.callParent();
        this.down('#category-field').on('change', this.onCategoryChange, this);
        this.down('#subcategory-field').on('change', this.onSubcategoryChange, this);
        this.down('#name-field').on('change', this.onNameChange, this);
//        this.down('#add-category-btn').on('click', this.addCategory, this);
//        this.down('#add-subctg-btn').on('click', this.addSubcategory, this);
//        this.down('#add-name-btn').on('click', this.addNewName, this);
//        this.down('#add-type-btn').on('click', this.addNewType, this);
        this.down('#new-product-btn').on('click', this.onAddNewProduct, this);
        this.down('#new-goods-btn').on('click', this.onAddNewGoods, this);
        this.on('productsloaded', this.showCategoryData);
        this.on('shopsloaded', this.showShops);
    },

    filterData: function(data, type){
        var arr = [];
        for(var i=0; i<data.length; i++){
            if(arr.length == 0){
                arr.push(data[i])
            }else{
                var isExist = false;
                for(var j=0; j<arr.length; j++){
                    if(data[i][type] == arr[j][type]){
                        isExist = true
                    }
                }
                if(!isExist){
                    arr.push(data[i])
                }
            }
        }
        return arr;
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
        this.down('#shop-field').bindStore(this.shopStore);
    },

    showCategoryData: function(){
        var store = Ext.create('Ext.data.Store', {
            model: 'FlowersDB.model.Products',
            sorters: [{
                property: 'category',
                direction: 'ASC'
            }]
        });
        var arr = this.filterData(this.data, 'category');
        store.loadData(arr);

        this.down('#category-field').setValue(null);
        this.down('#category-field').bindStore(store);
//        this.down('#category-field').setValue(store.first())
    },

    onCategoryChange: function(el, newValue, oldValue){
        var store = Ext.create('Ext.data.Store', {
            model: 'FlowersDB.model.Products',
            sorters: [{
                property: 'subcategory',
                direction: 'ASC'
            }]
        });
        var arr = [];
        for(var i=0; i<this.data.length; i++){
            if(this.data[i].category == newValue){
                arr.push(this.data[i]);
            }
        }
        arr = this.filterData(arr, 'subcategory');
        store.loadData(arr);

        this.down('#subcategory-field').setValue(null);
        this.down('#subcategory-field').bindStore(store);
    },
    onSubcategoryChange: function(el, newValue){
        var store = Ext.create('Ext.data.Store', {
            model: 'FlowersDB.model.Products',
            sorters: [{
                property: 'name',
                direction: 'ASC'
            }]
        });
        var arr = [];
        for(var i=0; i<this.data.length; i++){
            if(this.data[i].subcategory == newValue){
                arr.push(this.data[i]);
            }
        }
        arr = this.filterData(arr, 'name');
        store.loadData(arr);
        this.down('#name-field').setValue(null);
        this.down('#name-field').bindStore(store);
    },

    onNameChange: function(el, newValue){
        var store = Ext.create('Ext.data.Store', {
            model: 'FlowersDB.model.Products',
            sorters: [{
                property: 'type',
                direction: 'ASC'
            }]
        });
        var arr = [];
        for(var i=0; i<this.data.length; i++){
            if(this.data[i].name == newValue){
                arr.push(this.data[i]);
            }
        }
        arr = this.filterData(arr, 'type');
        store.loadData(arr);
        this.down('#type-field').setValue(null);
        this.down('#type-field').bindStore(store);
    },

    onAddNewProduct:function(){
        var obj = {};
        obj.category = this.down('#category-field').getValue();
        obj.subcategory = this.down('#subcategory-field').getValue();
        obj.name = this.down('#name-field').getValue();
        obj.type = this.down('#type-field').getValue();
        obj.description = this.down('#description-field').getValue();
        this.fireEvent('addnewproduct', obj,this);
    },
    onAddNewGoods: function(){
        var obj = {};
        if(this.down('#shop-field').getValue()){
            var shopRecord = this.down('#shop-field').findRecord(this.down('#shop-field').getValue());
            obj.shopId = shopRecord.data.shopId;
        }
        obj.productId = this.down('#name-field').findRecord(this.down('#name-field').getValue()).data.id;
        obj.price = this.down('#price-field').getValue();
        obj.status = 'shop';
        var quantity = this.down('#quantity-field').getValue();
        this.fireEvent('addnewgoods', obj,quantity,  this);
    }
});