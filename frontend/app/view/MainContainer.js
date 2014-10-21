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
    cls: 'app-main-container',
    layout:'hbox',

    width: '100%',
    data: null,
    items: [
        {
            xtype:'container',
            layout: {
                type: 'vbox'
            },
            items:[
                {
                    xtype: 'shop-boxes',
                    hidden:true
                },
                {
                    xtype: 'products-boxes',
                    hidden:true
                },

                {
                    xtype: 'income-container',
                    width: 400,
                    height:400,
                    hidden:true
                },
                {
                    xtype: 'sale-container',
                    width: 400,
                    height:200,
                    hidden:true
                },
                {
                    xtype: 'revaluation-container',
                    width: 400,
                    height:200,
                    hidden:true
                },
                {
                    xtype: 'writeoff-container',
                    width: 400,
                    height:200,
                    hidden:true
                },
                {
                    xtype: 'balance-container',
                    width: 300,
                    height:200,
                    hidden:true
                },
                {
                    xtype: 'revenue-container',
                    width: 300,
                    height:200,
                    hidden:true
                },

                {
                    xtype: 'add-category',
                    width: 400,
                    height:200,
                    hidden:true
                }
            ]
        },
        {
            xtype:'container',
            flex:1,
            region:'east',
            items:[
                {
                    flex:1,
                    hidden:true,
                    itemId:'balance-grid',
                    xtype:'balance-grid'
                }
            ]
        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        this.doLayout();
        this.down('#new-product-btn').on('click', this.onAddNewProduct, this);
        this.down('#new-goods-btn-revaluation').on('click', this.changePriceForGoods, this);
        this.down('#new-goods-btn-income').on('click', this.onAddNewGoods, this);
        this.down('#new-goods-btn-sale').on('click', this.setSaleStatus, this);
        this.down('#write-off-btn').on('click', this.setWriteOff, this);
        this.down('#balance-btn').on('click', this.onBalanceClick, this);

        this.on('income', this.showCorrectContainer, this);
        this.on('addcategory', this.showAddCategoryContainer, this);
        this.on('showdashboard', this.showDashboard, this);
        this.on('balance', this.showBalance, this);
        this.on('revenue', this.showRevenueContainer, this);
    },
    showDashboard:function(){
        this.setContainerHidden();
        this.setComboBoxVisibility(false)
    },

    setComboBoxVisibility:function(value){
        this.down('#shop-boxes').setVisible(value);
        this.down('#products-boxes').setVisible(value);
    },

    showCorrectContainer:function(btn){
        this.setComboBoxVisibility(true);
        this.setContainerHidden();
        var cont = null;
        if(btn.itemId == 'income-btn'){
            cont =this.down('#income-container');
            cont.setVisible(true);
        }else if(btn.itemId == 'sale-btn'){
            cont = this.down('#sale-container');
            cont.setVisible(true)
        }else if(btn.itemId == 'revaluation-btn'){
            cont = this.down('#revaluation-container');
            cont.setVisible(true)
        }else if(btn.itemId == 'write-off-btn'){
            cont = this.down('#writeoff-container');
            cont.setVisible(true)
        }
        cont.down('#price-field').setValue(null);
        cont.down('#quantity-field').setValue(null);
        if(cont.down('#prev-price-field'))
            cont.down('#prev-price-field').setValue(null);

    },
    setContainerHidden: function(){
        this.down('#income-container').setVisible(false);
        this.down('#sale-container').setVisible(false);
        this.down('#revaluation-container').setVisible(false);
        this.down('#new-product-container').setVisible(false);
        this.down('#writeoff-container').setVisible(false);
        this.down('#balance-container').setVisible(false);
        this.down('#balance-grid').setVisible(false);
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


    onAddNewProduct:function(){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');
        var cont = this.down('#new-product-container');
        var isCorrect =  cont.checkData();
        if(isCorrect) {
            var obj = {};
            obj.category = cont.down('#category-field').getValue();
            obj.subcategory = cont.down('#subcategory-field').getValue();
            obj.name = cont.down('#name-field').getValue();
            obj.type = cont.down('#type-field').getValue();
            obj.description = cont.down('#description-field').getValue();
            this.fireEvent('addnewproduct', obj, this);
        }
    },
    onAddNewGoods: function(){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');

        var isCorrect = this.checkData(this.down('#income-container'));
        if(isCorrect){
            var obj = {};
            obj.shopId = shopsView.shopValue.shopId;
            obj.productId = productsView.productValue.id;
            obj.category = productsView.productValue.category;
            obj.subcategory = productsView.productValue.subcategory;
            obj.name = productsView.productValue.name;
            obj.type = productsView.productValue.type;
            obj.date = this.down('#income-container').down('#date-field-picker').getValue();
            obj.price = this.down('#income-container').down('#price-field').getValue();
            obj.status = 'shop';
            var quantity = this.down('#income-container').down('#quantity-field').getValue();
            this.fireEvent('addnewgoods', obj, quantity,  this);
        }

    },
    checkData: function(container){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');

        var isCorrect = true;
        if(!container.down('#price-field').getValue()){
            container.down('#price-err').setVisible(true);
            isCorrect = false;
        }
        if(!container.down('#quantity-field').getValue()){
            container.down('#count-err').setVisible(true);
            isCorrect = false;
        }
        if(container.down('#prev-price-field') && !container.down('#prev-price-field').getValue()){
            container.down('#prev-price-err').setVisible(true);
            isCorrect = false;
        }
        if(!productsView.checkData()){
            isCorrect = false;
        }
        if(!shopsView.checkData()){
            isCorrect = false;
        }
        return isCorrect;
    },

    changePriceForGoods: function(){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');
        var isCorrect = this.checkData(this.down('#revaluation-container'));
        var cont = this.down('#revaluation-container');
        if(isCorrect){
            var obj = {};
            obj.shopId = shopsView.shopValue.shopId;
            obj.productId = productsView.productValue.id;
            obj.status = 'shop';
            obj.price = cont.down('#price-field').getValue();
            var quantity = cont.down('#quantity-field').getValue();
            var prevValue = cont.down('#prev-price-field').getValue();
            this.fireEvent('changeprice', obj,quantity, prevValue,  this);
        }

    },

    setSaleStatus: function(){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');
        var isCorrect = this.checkData(this.down('#sale-container'));
        if(isCorrect){
            var obj = {};
            obj.shopId = shopsView.shopValue.shopId;
            obj.productId = productsView.productValue.id;
            obj.status = 'shop';
            obj.price = this.down('#sale-container').down('#price-field').getValue();
            obj.date = this.down('#sale-container').down('#date-field-picker').getValue();
            var quantity = this.down('#sale-container').down('#quantity-field').getValue();
            this.fireEvent('soldstaus', obj,quantity,  this);
        }
    },

    setWriteOff: function(){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');
        var isCorrect = this.checkData(this.down('#writeoff-container'));
        if(isCorrect){
            var obj = {};
            obj.shopId = shopsView.shopValue.shopId;
            obj.productId = productsView.productValue.id;
            obj.price = this.down('#writeoff-container').down('#price-field').getValue();
            obj.date = this.down('#writeoff-container').down('#date-field-picker').getValue();
            var quantity = this.down('#writeoff-container').down('#quantity-field').getValue();
            this.fireEvent('writeoff', obj,quantity,  this);
        }
    },

    showBalance: function(){
        this.setComboBoxVisibility(true);
        this.setContainerHidden();
        this.down("#balance-container").setVisible(true);
        this.down('#balance-grid').setVisible(true);

    },
    onBalanceClick: function(){
        var shopsView = this.down('#shop-boxes');
        var productsView = this.down('#products-boxes');
        var obj = {};
        if(shopsView.shopValue){
            obj.shopId = shopsView.shopValue.shopId;
        }else{

        }
        if(productsView.productValue){
            obj.productId = productsView.productValue.id;
            obj.category = productsView.productValue.category;
            obj.subcategory = productsView.productValue.subcategory;
            obj.name = productsView.productValue.name;
            obj.type = productsView.productValue.type;
        }else{
            obj.category = productsView.down('#category-field').getValue();
            obj.subcategory = productsView.down('#subcategory-field').getValue();
            obj.name = productsView.down('#name-field').getValue();
            obj.type = productsView.down('#type-field').getValue();
            obj.productId = null;
        }

        this.fireEvent('showBalance', obj,  this);
    },

    showRevenueContainer: function(){

    },


    showAddCategoryContainer:function(){
        this.setComboBoxVisibility(false);
        this.setContainerHidden();
        this.down("#new-product-container").setVisible(true);
    }


});