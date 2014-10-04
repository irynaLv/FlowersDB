/**
 * Created by Iryna on 21.09.2014.
 */

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

GoodsSchema = new mongoose.Schema({
    shopId:{
        type: Number,
        required:true
    },
    productId:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
            required:true
    },
    status:{
        type: String,
            required:true
    },
    incomeDate:{
        type: Date,
        required: true
    },
    saleDate:{
        type: Date
//        required: true
    },
    category:{
        type: String,
        required:true
    },
    subcategory:{
        type: String,
        required:true
    },
    name:{
        type: String
//            required:true
    },
    type:{
        type: String
//            required:true
    }


});
//ProductsSchema.plugin(autoIncrement.plugin, { model: 'products', field: 'id' });
module.exports = mongoose.model('goods', GoodsSchema, 'goods');
