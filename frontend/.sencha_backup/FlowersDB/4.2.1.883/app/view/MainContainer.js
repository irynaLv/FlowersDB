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
            xtype: 'shop-boxes'
        },
        {
            xtype:'products-boxes'
        },

        {
            xtype:'number-input-field'
        },

        {
            xtype:'add-category'

        }


    ],
    initComponent: function () {
        var me = this;
        me.callParent();
        this.down('#new-product-btn').on('click', this.onAddNewProduct, this);
        this.down('#new-goods-btn-revaluation').on('click', this.changePriceForGoods, this);
        this.down('#new-goods-btn-income').on('click', this.onAddNewGoods, this);
        this.down('#new-goods-btn-sale').on('click', this.setSaleStatus, this);
        this.down('#quantity-field').on('blur', this.checkIfEmpty, this, this.down('#count-err'));
        this.down('#price-field').on('blur', this.checkIfEmpty, this, this.down('#price-err'));
        this.on('income', this.setNumericContainer, this);
        this.on('addcategory', this.showAddCategoryContainer, this);
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

    },
    setEditableShops:function(value){
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

    checkIfEmpty: function( el,e, err){
        if(el.getValue() > 0){
            err.setVisible(false)
        }
    },

    onAddNewProduct:function(){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');
        var isCorrect =  productsView.checkData() && shopsView.checkData();
        if(isCorrect) {
            var obj = {};
            obj.category = this.down('#category-field').getValue();
            obj.subcategory = this.down('#subcategory-field').getValue();
            obj.name = this.down('#name-field').getValue();
            obj.type = this.down('#type-field').getValue();
            obj.description = this.down('#description-field').getValue();
            this.fireEvent('addnewproduct', obj, this);
        }
    },
    onAddNewGoods: function(){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');
        var isCorrect = this.checkData() && productsView.checkData() && shopsView.checkData();
        if(isCorrect){
            var obj = {};
            obj.shopId = shopsView.shopValue.shopId;
            obj.productId = productsView.productValue.id;
            obj.category = productsView.productValue.category;
            obj.subcategory = productsView.productValue.subcategory;
            obj.name = productsView.productValue.name;
            obj.type = productsView.productValue.type;
//            console.log(ths.productValue.name, this.productValue.subcategory,  this.productValue.type)
            obj.price = this.down('#price-field').getValue();
            obj.status = 'shop';
            var quantity = this.down('#quantity-field').getValue();
            this.fireEvent('addnewgoods', obj, quantity,  this);
        }

    },
    checkData: function(){
        var isCorrect = true;
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

    },

    setSaleStatus: function(){
        var isCorrect = this.checkData();
        if(isCorrect){
            var obj = {};
            obj.shopId = this.shopValue.shopId;
            obj.productId = this.productValue.id;
            console.log(this.productValue.name, this.productValue.subcategory,  this.productValue.type);
            obj.price = this.down('#price-field').getValue();
//            if(this.shopValue.name == 'Склад'){
//                obj.status = 'warehouse';
//            }else{
//                obj.status = 'shop'
//            }
            obj.status = 'shop';
            var quantity = this.down('#quantity-field').getValue();
//            var prevValue = this.down('#prev-price-field').getValue();
            this.fireEvent('soldstaus', obj,quantity,  this);
        }
    },
    showAddCategoryContainer:function(){
        this.down("#new-product-container").setVisible(true);
        this.setEditableFields(true);
        this.down('#shop-field').setVisible(false)
    }
});