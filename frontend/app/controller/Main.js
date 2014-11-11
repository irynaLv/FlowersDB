Ext.define('FlowersDB.controller.Main', {
    extend: 'Ext.app.Controller',
    stores:[
        'FlowersDB.store.Products',
        'FlowersDB.store.Shops',
        'FlowersDB.store.Balance'
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
        //this.checkIfUserLogging();


    },

    initControllers:function(){
        this.control({
            'app-main': {
                render: this.checkIfUserLogging
            },
            'app-main-container':{

                'addnewproduct': this.addNewProductItem,
                'addnewgoods': this.addNewGoods,
                'changeprice': this.changePriceForSelectedGoods,
                'soldstaus': this.setSaleStatus,
                'writeoff' : this.setWriteOff,
                'showBalance' : this.getBalance,
                'showRevenue' : this.getRevenue,
                'loginrequest' : this.sendLoginRequest
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
            'app-menu #revenue-btn':{
                click: this.onRevenueBtn
            },
            'app-menu #main-btn':{
                click: this.showDashboard
            },
            'app-menu #logout-btn':{
                click: this.logoutUser
            }

        });
    },

    initStores: function(){
        this.productsStore = Ext.getStore('FlowersDB.store.Products');
        this.shopsStore = Ext.getStore('FlowersDB.store.Shops');
        this.balanceStore = Ext.getStore('FlowersDB.store.Balance');
        this.balanceStore.on('load', this.sortBalanceData, this);
        this.balanceStore.on('datachanged', this.setTotalAmount, this);
        this.alert = Ext.create('Ext.window.MessageBox');
    },
    checkIfUserLogging: function(){
        var data = localStorage.getItem('userData');
        if(data){
            this.userData = JSON.parse(data);
            this.getMenu().setVisible(true);
            this.getMenu().down('#main-btn').toggle(true);
            this.getMainContainer().showDashboard();
            this.getMainContainer().down('#login-field').setValue(null);
            this.getMainContainer().down('#pass-field').setValue(null);
        }else{
           this.getMenu().setVisible(false);
           this.getMainContainer().openLoginForm();
        }
    },

    sendLoginRequest: function(body){
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: '/login',
            params: {
                password: body.pass,
                login: body.login
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);
                if(data.msg){
                    me.alert.alert('Помилка логування', 'Користувач не знайдено, введіть корректний логін і пароль');
                    return;
                } else{
                    localStorage.setItem('userData', text);
                    me.checkIfUserLogging();
                }

            },
            error:function(){

            }
        })
    },
    logoutUser: function(){

        var me = this;
        Ext.Ajax.request({
            method: 'GET',
            url: '/logout',
            params: {
            },
            success: function(response){
                //var text = response.responseText;
                localStorage.removeItem('userData');
                me.userData = null;
                me.checkIfUserLogging();
            },
            error:function(){

            }
        })
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
        //this.showMsgAlert();
        var me = this;
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
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);
                if(data.msg){
                    me.alert.alert('Результат', 'Товар вже є в базі даних ');
                } else{
                    me.alert.alert('Результат', 'Додано новий товар в категорію ' + body.category);
                }
            },
            error:function(){

            }
        })

    },
    addNewGoods: function(body, quantity){
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/newgoods',
            params: {
                shopId: parseInt(body.shopId),
                productId: parseInt(body.productId),
                price: parseInt(body.price),
                purchasePrice: parseInt(body.purchasePrice),
                status: body.status,
                quantity: parseInt(quantity),
                category: body.category,
                subcategory: body.subcategory,
                name:body.name,
                userId: me.userData.id,
                date:body.date,
                type:body.type
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);
                me.prepareDataForBalance(data);
                me.alert.alert('Результат', 'Прихід: ' + " категорія "+ body.category + " кількість " +quantity + " ціна "+ body.price );
            },
            error:function(){

            }
        })
    },

    prepareDataForBalance: function(data){
        var cont = this.getMainContainer();
        var obj = {};
        if(cont.categoryField == data.category){
            obj.category = data.category;
        }else{
            obj.category = data.category;
        }
        if(cont.subcategoryField == data.subcategory){
            obj.subcategory = data.subcategory;
        }else if(data.subcategory == 'Вазонки' || data.subcategory == 'Троянди' || data.subcategory == 'Статуетки'){
            obj.subcategory = data.subcategory;
        }
        if(cont.nameField == data.name){
            obj.name = data.name;
        }
        if(cont.typeField == data.typr){
            obj.type = data.type;
        }
        if(cont.shopField == data.shopId){
            obj.shopId = data.shopId;
        }else{
            obj.shopId = data.shopId;
        }
        this.getBalance(obj)
    },

    setCorrectContainer: function(el){
        this.loadProductsAndShop();
        this.balanceStore.removeAll();
        this.getBalanceGrid().down('#total-amount').setValue(0);
        this.getMainContainer().fireEvent('income', el)
    },

    addNewCategory:function(el){
        this.loadProductsAndShop(true);

        this.getMainContainer().fireEvent('addcategory');
    },
    changePriceForSelectedGoods: function(body, quantity, prevValue){
        var me = this;
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
                if(data.length >0){
                    me.prepareDataForBalance(data[0]);
                    me.alert.alert('Результат', 'Ціну змінено з '+ prevValue +'грн на '+body.price+ 'грн в категорії '+ data[0].category);
                }else{
                    me.alert.alert('Результат', 'Товарів із заданими параметрами не знайдено');
                }
            },
            error:function(){

            }
        })
    },
    setSaleStatus: function(body, quantity, prevValue){
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/saleproducts',
            params: {
                shopId: parseInt(body.shopId),
                productId: parseInt(body.productId),
                price: parseInt(body.price),
                status: body.status,
                userId: me.userData.id,
                date: body.date,
                quantity: parseInt(quantity)
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);
                if(data.length >0){
                    me.prepareDataForBalance(data[0]);
                    me.alert.alert('Результат', 'Продано ' +data.length + ' товари(-ів)');
                }else{
                    me.alert.alert('Результат', 'Товарів із заданими параметрами не знайдено');
                }

            },
            error:function(){

            }
        })
    },

    setWriteOff: function(body, quantity){
        var me = this;
        Ext.Ajax.request({
            method: 'POST',
            url: '/api/writeoff',
            params: {
                shopId: parseInt(body.shopId),
                productId: parseInt(body.productId),
                price: parseInt(body.price),
                date:body.date,
                userId: me.userData.id,
                quantity: parseInt(quantity)
            },
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);
                if(data.length >0){
                    me.prepareDataForBalance(data[0]);
                    me.alert.alert('Результат', 'Списано ' + data.length + ' товарів(-и)');
                }else{
                    me.alert.alert('Результат', 'Товарів із заданими параметрами не знайдено');
                }
            },
            error:function(){

            }
        })
    },

    onBalanceBtn: function(){
        this.loadProductsAndShop();
        this.balanceStore.removeAll();
        this.getBalanceGrid().down('#total-amount').setValue(0);
        this.getMainContainer().fireEvent('balance', this)
    },

    getBalance: function(body, isSection){
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
            params: obj,
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
        this.totalAmount = 0;
        var arr =[];
        for(var i=0; i<data.length; i++){
            if(arr.length == 0){
                data[i].counter = 1;
                this.totalAmount +=data[i].price;
                arr.push(data[i])
            }else{
                var prodId = data[i].productId;
                var price = data[i].price;
                var shopId = data[i].shopId;
                var isExist = true;
                for(var j=0; j<arr.length; j++){
                    var arrId = arr[j].productId;
                    var arrPrice = arr[j].price;
                    var arrShop = arr[j].shopId;
                    if(arrId == prodId && arrPrice == price && arrShop == shopId){
                        arr[j].counter++;
                        this.totalAmount +=arr[j].price;
                        isExist = true;
                        break;
                    }else{
                        isExist = false
                    }
                }
                if(!isExist){
                    data[i].counter = 1;
                    this.totalAmount +=data[i].price;
                    arr.push(data[i])
                }
            }
        }
        this.balanceStore.removeAll();
        this.balanceStore.loadData(arr);

        this.getBalanceGrid().bindStore(this.balanceStore);
        this.getBalanceGrid().reconfigure(this.balanceStore);
        this.getBalanceGrid().down('#total-amount').setValue(this.totalAmount)
    },

    setTotalAmount:function(){

    },

    onRevenueBtn: function(){
        this.loadProductsAndShop(true);
        this.balanceStore.removeAll();
        this.getBalanceGrid().down('#total-amount').setValue(0);
        this.getMainContainer().fireEvent('revenue');
    },

    getRevenue: function(body){
        var me = this;
        var obj= {};
        var shopId = body.shopId;
        var productId  = body.productId;
        var category  = body.category;
        var subcategory  = body.subcategory;
        var name  = body.name;
        obj.dateFrom  = body.dateFrom;
        obj.dateTo  = new Date(body.dateTo.setHours(23,59,59,999));
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
            url: '/api/revenue',
            params: obj,
            success: function(response){
                var text = response.responseText;
                var data = JSON.parse(text);
                me.sortBalanceData(data)

            },
            error:function(){

            }
        })

    }



});
