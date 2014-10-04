/**
 * Created by Iryna on 23.09.2014.
 */
Ext.define('FlowersDB.view.ProductsBoxes', {
        extend: 'Ext.container.Container',
        requires: [

        ],

        xtype: 'products-boxes',
        itemId: 'products-boxes',
        cls: 'products-boxes',

        layout: 'vbox',
        items:[
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
                        cls: 'input-field',
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
                        cls: 'input-field',
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
                        cls: 'input-field',
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
                        cls: 'input-field',
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
            }

        ],
        initComponent: function () {
            var me = this;
            this.productValue = null;
            me.callParent();
            this.down('#category-field').on('change', this.onCategoryChange, this);
            this.down('#subcategory-field').on('change', this.onSubcategoryChange, this);
            this.down('#name-field').on('change', this.onNameChange, this);
            this.down('#type-field').on('change', this.onTypeChange, this);
            this.on('productsloaded', this.showCategoryData);
        },


        setEditableFields: function(value){
            this.down('#category-field').setEditable(value);
            this.down('#subcategory-field').setEditable(value);
            this.down('#name-field').setEditable(value);
            this.down('#type-field').setEditable(value);
            this.down('#shop-field').setEditable(value);
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

        checkData: function(){
            var isCorrect = true;

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
             return isCorrect;
        }




    }

);