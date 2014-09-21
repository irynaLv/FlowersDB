/**
 * Created by Iryna on 20.09.2014.
 */

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

    ProductsSchema = new mongoose.Schema({
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
        },
        description:{
            type: String
        },
        photoId:{
            type: Number
        },
        id:{
            type: Number
        }

    });
ProductsSchema.plugin(autoIncrement.plugin, { model: 'products', field: 'id' });
module.exports = mongoose.model('products', ProductsSchema, 'products');
