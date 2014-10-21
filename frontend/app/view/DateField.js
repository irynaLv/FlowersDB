/**
 * Created by Iryna on 17.10.2014.
 */

Ext.define('FlowersDB.view.DateField', {
    extend: 'Ext.container.Container',
    requires: [
    ],

    xtype: 'date-field',
    itemId: 'date-field',
    cls: 'date-field',

    layout: {
        type: 'vbox'
    },
    items: [
                {
                    fieldLabel: 'Дата',
                    flex: 1,
                    maskRe: /[0-9\/]/,
                    startDay:1,
                    maxValue: new Date(),
                    name: 'startDate',
                    value: new Date(),
                    cls:'input-field',
                    itemId:'date-field-picker',
                    submitFormat : 'time',
                    xtype: 'datefield'
                }

         ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
//        this.down('#change-date-btn').on('click', this.onCalendarBtn, this);
    },

    onCalendarBtn: function(){
        this.down('#date-picker').setVisible(true);
    }

})
