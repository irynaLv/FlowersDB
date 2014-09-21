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
        }
    ],
    init: function() {
        this.initControllers();
        this.initStores();


    },

    initControllers:function(){
        this.control({
            'app-main': {
                render: this.loadProductsAndShop
            },
            'app-main-container':{
                'addnewproduct': this.addNewProductItem,
                'addnewgoods': this.addNewGoods
            },
            'app-menu #income-btn, app-menu #sale-btn, app-menu #revaluation-btn':{
                click: this.setCorrectContainer
            }

        });
    },

    initStores: function(){
        this.productsStore = Ext.getStore('FlowersDB.store.Products');
        this.shopsStore = Ext.getStore('FlowersDB.store.Shops');
    },
    loadProductsAndShop: function(){
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
                me.loadCategory(JSON.parse(text));

            },
            error:function(){
                console.log('Faild');
            }
        })
    },

    loadShops: function(data){
        this.shopsStore.loadData(data);
        this.getMainContainer().shopData =  data;
        this.getMainContainer().fireEvent('shopsloaded');
    },

    loadCategory: function(data){
        this.productsStore.loadData(data);
//        this.getMainContainer().data =  this.productsStore;
        this.getMainContainer().data =  data;
        this.getMainContainer().fireEvent('productsloaded');
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
                quantity: parseInt(quantity)
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
        this.getMainContainer().fireEvent('income', el)
    }

});
