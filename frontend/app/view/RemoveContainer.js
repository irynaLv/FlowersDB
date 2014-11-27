/**
 * Created by Iryna on 17.11.2014.
 */
/**
 * Created by Iryna on 07.10.2014.
 */
/**
 * Created by Iryna on 04.10.2014.
 */
Ext.define('FlowersDB.view.RemoveContainer', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'remove-container',
    itemId: 'remove-container',
    cls: 'remove-container',

    layout: {
        type: 'vbox'
    },
    flex:1,
    width: '100%',
    items: [
//        {
//            xtype: 'date-field'
//        },
        {
            xtype:'container',
            layout:'hbox',
            items:[
                {
                    xtype:'combobox',
                    fieldLabel:'Статус товару',
                    queryMode:'local',
                    cls: 'input-field',
                    itemId: 'status-field',
                    displayField:'status',
                    valueField: 'type'
                },
                {
                    xtype: 'label',
                    itemId: 'status-err',
                    hidden: true,
                    text: 'Вкажіть статус товару',
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
                    name: 'bottles',
                    cls: 'input-field',
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
                    cls: 'input-field',
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
            xtype: 'button',
            text:"Видалити товар",
            itemId:'delete-goods-btn'
        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        var store = Ext.create('Ext.data.Store', {
            fields: ['type', 'status'],
            data : [
                {
                    type: 'shop',
                    status: 'В наявності'
                },
                {
                    type:'sold',
                    status:"Проданий"
                }
            ]
        });
        this.down('#status-field').store = store;
        this.down('#quantity-field').on('blur', this.checkIfEmpty, this, this.down('#count-err'));
        this.down('#price-field').on('blur', this.checkIfEmpty, this, this.down('#price-err'));
        this.down('#status-field').on('blur', this.checkIfStatusCorrect, this, this.down('#status-err'));
    },
    checkIfEmpty: function( el,e, err){
        if(el.getValue() > 0){
            err.setVisible(false)
        }
    },
    checkIfStatusCorrect: function(el,e, err){
        var value = el.getValue();
        var isCorrect = false;
        var store =  this.down('#status-field').getStore();
        if(value){
            for(var i=0; i < store.data.items.length; i++){
                if(value == store.data.items[i].data.type){
                    isCorrect = true
                }
            }
            if(!isCorrect){
                err.setVisible(true)
            }else{
                err.setVisible(false)
            }
        }else{
            err.setVisible(true)
        }
    }

})
