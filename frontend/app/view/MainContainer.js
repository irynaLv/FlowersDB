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
    width: '100%',
    data: null,
    items: [
        {
            xtype: 'container',
            layout: 'hbox',
//            flex: 1,
//            minWidth: 400,
            items:[
                {
                    xtype: 'combobox',
                    fieldLabel: 'Магазин',
                    itemId: 'shop-field',
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
                    text: 'Виберіть магазин',
                    margin: '0 0 0 10'
                }
            ]
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
                    editable: false,
                    queryMode: 'local',
                    displayField: 'category',
                    valueField: 'category',
                    renderTo: Ext.getBody()
                },
                {
                    xtype: 'label',
                    itemId: 'category-err',
                    hidden: true,
                    text: 'Виберіть категорію',
                    margin: '0 0 0 10'
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
                    editable: false,
                    hidden: true,
                    queryMode: 'local',
                    displayField: 'subcategory',
                    valueField: 'subcategory',
                    renderTo: Ext.getBody()
                },
                {
                    xtype: 'label',
                    itemId: 'subcategory-err',
                    hidden: true,
                    text: 'Виберіть підкатегорію',
                    margin: '0 0 0 10'
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
                    editable: false,
                    hidden: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'name',
                    renderTo: Ext.getBody()
                },
                {
                    xtype: 'label',
                    itemId: 'name-err',
                    hidden: true,
                    text: 'Вкажіть назву',
                    margin: '0 0 0 10'
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
                    editable: false,
                    hidden: true,
                    queryMode: 'local',
                    displayField: 'type',
                    valueField: 'type',
                    renderTo: Ext.getBody()
                },
                {
                    xtype: 'label',
                    itemId: 'type-err',
                    hidden: true,
                    text: 'Вкажіть тип',
                    margin: '0 0 0 10'
                }
            ]
        },
        {
            xtype:'container',
            layout: 'vbox',
            hidden: true,
            itemId: 'number-fields',
            items:[
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            name: 'bottles',
                            itemId: 'quantity-field',
                            fieldLabel: 'Кількість'
                        },
                        {
                            xtype: 'label',
                            itemId: 'count-err',
                            hidden: true,
                            text: 'Вкажіть кількість',
                            margin: '0 0 0 10'
                        }
                    ]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            itemId: 'price-field',
                            name: 'bottles',
                            fieldLabel: 'Ціна'
                        },
                        {
                            xtype: 'label',
                            itemId: 'price-err',
                            hidden: true,
                            text: 'Вкажіть ціну',
                            margin: '0 0 0 10'
                        }
                    ]
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'numberfield',
                            anchor: '100%',
                            itemId: 'prev-price-field',
                            name: 'bottles',
                            fieldLabel: 'Попередня ціна'
                        },
                        {
                            xtype: 'label',
                            itemId: 'price-err',
                            hidden: true,
                            text: 'Вкажіть попередню ціну',
                            margin: '0 0 0 10'
                        }
                    ]
                },

                {
                    xtype: 'button',
//                    disabled: true,
                    text:"Додати товар",
                    hidden: true,
                    itemId:'new-goods-btn-income'
                },
                {
                    xtype: 'button',
                    text:"Проданий товар",
//                    disabled: true,
                    hidden: true,
                    itemId:'new-goods-btn-sale'
                },
                {
                    xtype: 'button',
//                    disabled: true,
                    text:"Переоцінити товар",
                    hidden: true,
                    itemId:'new-goods-btn-revaluation'
                }
            ]
        },

        {
            xtype:'container',
            layout: 'vbox',
            hidden: true,
            itemId: 'new-product-container',
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
        this.productValue = null;
        this.shopValue = null;
        me.callParent();
        this.down('#category-field').on('change', this.onCategoryChange, this);
        this.down('#subcategory-field').on('change', this.onSubcategoryChange, this);
        this.down('#name-field').on('change', this.onNameChange, this);
        this.down('#type-field').on('change', this.onTypeChange, this);
        this.down('#shop-field').on('change', this.onShopChange, this);
        this.down('#new-product-btn').on('click', this.onAddNewProduct, this);
        this.down('#new-goods-btn-revaluation').on('click', this.changePriceForGoods, this);
        this.down('#new-goods-btn-income').on('click', this.onAddNewGoods, this);
        this.down('#quantity-field').on('blur', this.checkIfEmpty, this, this.down('#count-err'));
        this.down('#price-field').on('blur', this.checkIfEmpty, this, this.down('#price-err'));
        this.on('productsloaded', this.showCategoryData);
        this.on('shopsloaded', this.showShops);
        this.on('income', this.setNumericContainer, this);
    },
    setButtonHidden: function(){
        this.down('#new-goods-btn-income').setVisible(false);
        this.down('#new-goods-btn-sale').setVisible(false);
        this.down('#new-goods-btn-revaluation').setVisible(false);
        this.down('#new-product-container').setVisible(false);
        this.down('#number-fields').setVisible(false);
    },

    setEditableFields: function(value){
        this.down('#category-field').setEditable(value);
        this.down('#subcategory-field').setEditable(value);
        this.down('#name-field').setEditable(value);
        this.down('#type-field').setEditable(value);
        this.down('#shop-field').setEditable(value);
    },

    setNumericContainer: function(btn){
        this.setButtonHidden();
        this.setEditableFields(false);
        if(btn.itemId == 'income-btn'){
            this.down('#new-goods-btn-income').setVisible(true);
        }else if(btn.itemId == 'sale-btn'){
            this.down('#new-goods-btn-sale').setVisible(true)
        }else if(btn.itemId == 'revaluation-btn'){
            this.down('#new-goods-btn-revaluation').setVisible(true)
        }
        this.down('#new-product-container').setVisible(false);
        this.down('#number-fields').setVisible(true);
    },

    filterData: function(data, type){
        var arr = [];
        for(var i=0; i<data.length; i++){
            if(arr.length == 0 && !!data[i][type]){
                arr.push(data[i])
            }else{
                var isExist = false;
                for(var j=0; j<arr.length; j++){
                    if( data[i][type] == arr[j][type]){
                        isExist = true
                    }
                }
                if(!isExist && !!data[i][type]){
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

    onShopChange: function(el, newValue){
        var typeRecord = this.down('#shop-field').findRecord('address', newValue);
        this.shopValue = typeRecord.data;
        this.down('#shop-err').setVisible(false);
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
        this.productValue = null;
        this.down('#category-err').setVisible(false);
        this.down('#subcategory-field').setVisible(false)
        this.down('#name-field').setVisible(false);
        this.down('#type-field').setVisible(false);
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
        if(arr.length > 0){
            this.down('#subcategory-field').setVisible(true)
        }
        store.loadData(arr);

        this.down('#subcategory-field').setValue(null);
        this.down('#subcategory-field').bindStore(store);
    },
    onSubcategoryChange: function(el, newValue){
        this.productValue = null;
        this.down('#subcategory-err').setVisible(false);
        this.down('#name-field').setVisible(false);
        this.down('#type-field').setVisible(false);
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
        if(arr.length == 1){
            this.productValue =arr[0];
        }
        arr = this.filterData(arr, 'name');
        if(arr.length > 0){
            this.down('#name-field').setVisible(true)
        }

        store.loadData(arr);
        this.down('#name-field').setValue(null);
        this.down('#name-field').bindStore(store);
    },

    onNameChange: function(el, newValue){
        this.productValue = null;
        this.down('#name-err').setVisible(false);
        this.down('#type-field').setVisible(false);
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
        if(arr.length == 1){
            this.productValue =arr[0];
        }
        arr = this.filterData(arr, 'type');
        if(arr.length > 0){
            this.down('#type-field').setVisible(true)
        }
        store.loadData(arr);
        this.down('#type-field').setValue(null);
        this.down('#type-field').bindStore(store);
    },

    onTypeChange: function(el, newValue){
        this.down('#type-err').setVisible(false);
        var typeRecord = this.down('#type-field').findRecord('type', newValue);
        this.productValue = typeRecord.data;
    },
    checkIfEmpty: function( el,e, err){
       if(el.getValue() > 0){
           err.setVisible(false)
       }
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
        var isCorrect = this.checkData();
        if(isCorrect){
            var obj = {};
            obj.shopId = this.shopValue.shopId;
            obj.productId = this.productValue.id;
            console.log(this.productValue.name, this.productValue.subcategory,  this.productValue.type)
            obj.price = this.down('#price-field').getValue();
            obj.status = 'shop';
            var quantity = this.down('#quantity-field').getValue();
            this.fireEvent('addnewgoods', obj,quantity,  this);
        }

    },
    checkData: function(){
        var isCorrect = true;
        if(!this.shopValue){
            this.down('#shop-err').setVisible(true);
            isCorrect = false;
        }
        if(this.productValue){
            if( this.down('#category-field').getValue() != this.productValue.category){
                this.down('#category-err').setVisible(true);
                isCorrect = false;
            }else if(this.down('#subcategory-field').isVisible() && this.down('#subcategory-field').getValue() && this.down('#subcategory-field').getValue() != this.productValue.subcategory){
                this.down('#subcategory-err').setVisible(true);
                isCorrect = false;
            }else if(this.down('#name-field').isVisible() && this.down('#name-field').getValue() &&  this.down('#name-field').getValue() != this.productValue.name){
                this.down('#name-err').setVisible(true);
                isCorrect = false;
            }else if(this.down('#type-field').isVisible() && this.down('#type-field').getValue() && this.down('#type-field').getValue() != this.productValue.type){
                this.down('#type-err').setVisible(true);
                isCorrect = false;
            }
        }else{
            if(!this.down('#category-field').getValue()){
                this.down('#category-err').setVisible(true);
                isCorrect = false;
            }else if(this.down('#subcategory-field').isVisible() && !this.down('#subcategory-field').getValue()){
                this.down('#subcategory-err').setVisible(true);
                isCorrect = false;
            }else if(this.down('#name-field').isVisible() && !this.down('#name-field').getValue()){
                this.down('#name-err').setVisible(true);
                isCorrect = false;
            }else if(this.down('#type-field').isVisible() && !this.down('#type-field').getValue()){
                this.down('#type-err').setVisible(true);
                isCorrect = false;
            }
        }
        if(!this.down('#price-field').getValue()){
            this.down('#price-err').setVisible(true);
            isCorrect = false;
        }
        if(!this.down('#quantity-field').getValue()){
            this.down('#count-err').setVisible(true);
            isCorrect = false;
        }
        return isCorrect;
    },

    changePriceForGoods: function(){
        var isCorrect = this.checkData();
        if(isCorrect){
            var obj = {};
            obj.shopId = this.shopValue.shopId;
            obj.productId = this.productValue.id;
            console.log(this.productValue.name, this.productValue.subcategory,  this.productValue.type)
            obj.price = this.down('#price-field').getValue();
//            if(this.shopValue.name == 'Склад'){
//                obj.status = 'warehouse';
//            }else{
//                obj.status = 'shop'
//            }
            obj.status = 'shop';
            var quantity = this.down('#quantity-field').getValue();
            var prevValue = this.down('#prev-price-field').getValue();
            this.fireEvent('changeprice', obj,quantity, prevValue,  this);
        }

    }
});