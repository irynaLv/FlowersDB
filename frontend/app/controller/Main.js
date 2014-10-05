Ext.define('FlowersDB.controller.Main', {
    extend: 'Ext.app.Controller',
    stores:[
        'FlowersDB.store.Products',
        'FlowersDB.store.Shops'
    ],
    models:[
        'Products'
    ],
    refs: [
        {
            ref: 'viewport',
            selector: 'viewport'
        },
        {
            ref: 'main',
            selector: 'app-main'
        },
        {
            ref: 'mainContainer',
            selector: 'app-main-container'
        },
        {
            ref: 'menu',
            selector: 'app-menu'
        },
        {
            ref: 'productsBoxes',
            selector: 'products-boxes'
        },
        {
            ref: 'shopBoxes',
            selector: 'shop-boxes'
        },
        {
            ref: 'addCategoryContainer',
            selector: 'add-category'
        }
    ],
    init: function() {
        this.initControllers();
        this.initStores();


    },

    initControllers:function(){
        this.control({
            'app-main': {
//                render: this.loadProductsAndShop
            },
            'app-main-container':{
                'addnewproduct': this.addNewProductItem,
                'addnewgoods': this.addNewGoods,
                'changeprice': this.changePriceForSelectedGoods,
                'soldstaus': this.setSaleStatus
            },
            'app-menu #income-btn, app-menu #sale-btn, app-menu #revaluation-btn':{
                click: this.setCorrectContainer
            },
            'app-menu #add-category-btn':{
                click: this.addNewCategory
            },
            'app-menu #main-btn':{
                click: this.showDashboard
            }

        });
    },

    initStores: function(){
        this.productsStore = Ext.getStore('FlowersDB.store.Products');
        this.shopsStore = Ext.getStore('FlowersDB.store.Shops');
    },
    loadProductsAndShop: function(isAddCategory){
        var me = this;
        Ext.Ajax.request({
            method: 'GET',
            url: '/api/shops',
            params: {
            },
            success: function(response){
                var text = response.responseText;
                me.loadShops(JSON.parse(text));

            },
            error:function(){
                console.log('Faild');
            }
        })

        Ext.Ajax.request({
            method: 'GET',
            url: '/api/products',
            params: {
            },
            success: function(response){
                var text = response.responseText;
                me.loadCategory(JSON.parse(text), isAddCategory);

            },
            error:function(){
                console.log('Faild');
            }
        })
    },

    loadShops: function(data){
        this.shopsStore.loadData(data);
        this.getShopBoxes().shopData =  data;
        this.getShopBoxes().fireEvent('shopsloaded');
    },

    showDashboard:function(){
        this.getMainContainer().fireEvent('showdashboard')
    },
    loadCategory: function(data, isAddCategory){
        this.productsStore.loadData(data);
        if(isAddCategory){
            this.getAddCategoryContainer().data = data
            this.getAddCategoryContainer().fireEvent('showdata')
        }else{
            this.getProductsBoxes().data =  data;
            this.getProductsBoxes().fireEvent('productsloaded');
        }

    },

    addNewProductItem: function(body){
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/product',
            params: {
                category: body.category,
                subcategory: body.subcategory,
                name: body.name,
                type: body.type,
                description: body.description,
                photoId: null
//                id: 14
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);

            },
            error:function(){

            }
        })

    },
    addNewGoods: function(body, quantity){
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/newgoods',
            params: {
                shopId: parseInt(body.shopId),
                productId: parseInt(body.productId),
                price: parseInt(body.price),
                status: body.status,
                quantity: parseInt(quantity),
                category: body.category,
                subcategory: body.subcategory,
                name:body.name,
                type:body.type
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);

            },
            error:function(){

            }
        })
    },

    setCorrectContainer: function(el){
        this.loadProductsAndShop();
        this.getMainContainer().fireEvent('income', el)
    },

addNewCategory:function(el){
//        this.getAddCategoryContainer().data = this.productsStore;
        this.loadProductsAndShop(true);

    this.getMainContainer().fireEvent('addcategory');
    },
    changePriceForSelectedGoods: function(body, quantity, prevValue){
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/changeprice',
            params: {
                shopId: parseInt(body.shopId),
                productId: parseInt(body.productId),
                price: parseInt(body.price),
                status: body.status,
                quantity: parseInt(quantity),
                prevValue: parseInt(prevValue)
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);

            },
            error:function(){

            }
        })
    },
    setSaleStatus: function(body, quantity, prevValue){
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/saleproducts',
            params: {
                shopId: parseInt(body.shopId),
                productId: parseInt(body.productId),
                price: parseInt(body.price),
                status: body.status,
                quantity: parseInt(quantity)
//                prevValue: parseInt(prevValue)
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);

            },
            error:function(){

            }
        })
    }


});
