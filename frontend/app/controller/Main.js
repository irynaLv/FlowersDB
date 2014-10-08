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
        },
        {
            ref: 'balanceGrid',
            selector: 'balance-grid'
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
                'soldstaus': this.setSaleStatus,
                'writeoff' : this.setWriteOff,
                'showBalance' : this.getBalance
            },
            'app-menu #income-btn, app-menu #sale-btn, app-menu #revaluation-btn, app-menu #write-off-btn':{
                click: this.setCorrectContainer
            },
            'app-menu #add-category-btn':{
                click: this.addNewCategory
            },
            'app-menu #balance-btn':{
                click: this.onBalanceBtn
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
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);

            },
            error:function(){

            }
        })
    },

    setWriteOff: function(body, quantity){
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/writeoff',
            params: {
                shopId: parseInt(body.shopId),
                productId: parseInt(body.productId),
                price: parseInt(body.price),
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

    onBalanceBtn: function(){
        this.loadProductsAndShop();
        this.getMainContainer().fireEvent('balance', this)
    },

    getBalance: function(body){
        var me = this;
        var obj= {};
        var shopId = body.shopId;
        var productId  = body.productId;
        var category  = body.category;
        var subcategory  = body.subcategory;
        var name  = body.name;
        if(shopId){
            obj.shopId = shopId;
        }
        if(productId){
            obj.productId = productId;
        }
        if(category){
            obj.category = category;
        }
        if(subcategory){
            obj.subcategory = subcategory;
        }
        if(name){
            obj.name = name;
        }

        Ext.Ajax.request({
            method: 'GET',
            url: '/api/balance',
            params:obj,
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);
                me.sortBalanceData(data)
            },
            error:function(){

            }
        })
    },

    sortBalanceData: function(data){
        var arr =[];
        for(var i=0; i<data.length; i++){
            if(arr.length == 0){
                data[i].counter = 1;
                arr.push(data[i])
            }else{
                var prodId = data[i].productId;
                var price = data[i].price;
                var isExist = true;
                for(var j=0; j<arr.length; j++){
                    var arrId = arr[j].productId;
                    var arrPrice = arr[j].price;
                    if(arrId == prodId && arrPrice == price){
                        arr[j].counter++;
                        isExist = true;
                        break;
                    }else{
                        isExist = false
                    }
                }
                if(!isExist){
                    data[i].counter = 1;
                    arr.push(data[i])
                }
            }
        }
        var store = Ext.create('FlowersDB.store.Balance');
        store.loadData(arr);
        var grid = Ext.create('FlowersDB.view.BalanceGrid', {
            store: store
        })
//        this.getBalanceGrid().store = store;
        this.getMainContainer().add(grid);
    }
});
