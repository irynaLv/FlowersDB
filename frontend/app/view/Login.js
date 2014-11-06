/**
 * Created by ikush on 11/5/2014.
 */

Ext.define('FlowersDB.view.Login', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    xtype: 'login-container',
    itemId: 'login-container',
    cls: 'login-container',

    layout: {
        type: 'vbox'
    },
    flex:1,
    width: '100%',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Логін',
            name: 'firstName',
            itemId: 'login-field'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Пароль',
            inputType: 'password',
            name: 'lastName',
            itemId: 'pass-field'
        },


        {
            xtype: 'button',
            text:"Залогуватися",
            itemId:'login-btn'
        }
    ],
    initComponent: function () {
        var me = this;
        me.callParent(arguments);

    }

})
