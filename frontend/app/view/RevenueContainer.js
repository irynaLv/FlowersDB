/**
 * Created by Iryna on 17.10.2014.
 */

Ext.define('FlowersDB.view.RevenueContainer', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'revenue-container',
    itemId: 'revenue-container',
    cls: 'revenue-container',

    layout: {
        type: 'vbox'
    },
    flex:1,
    width: '100%',
//    renderTo: Ext.getBody(),
    items: [
//        {
//            xtype: 'date-field',
//            fieldLabel:'Від',
//            itemId:'dateFrom'
//        },
//        {
//            xtype: 'date-field',
//            fieldLabel:'До',
//            itemId:'dateTo'
//        },
//
//        {
//            xtype: 'button',
//            text:"Виручка",
//            itemId:'revenue-btn'
//        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        var dateFrom = Ext.create('Ext.form.DateField', {
            fieldLabel:'Від',
            itemId:'dateFrom',
//            flex: 1,
            maskRe: /[0-9\/]/,
            startDay:1,
//            maxValue: new Date(),
            name: 'startDate',
            value: new Date(),
            cls:'input-field'
        });
        var dateTo =  Ext.create('Ext.form.DateField', {
            fieldLabel:'До',
            itemId:'dateTo',
//            flex: 1,
            maskRe: /[0-9\/]/,
            startDay:1,
            maxValue: new Date(),
            name: 'endDate',
            value: new Date(),
            cls:'input-field'
        });
        var btn = Ext.create('Ext.button.Button',{
            text:"Виручка",
            itemId:'revenue-btn'
        })
        this.add([dateFrom,dateTo, btn]);
//        dateFrom.setFieldLabel("Від");
        this.on('afterrender', this.setCorrectLabel, this);
    },

    setCorrectLabel: function(){
        console.log("Render")
    }

})
