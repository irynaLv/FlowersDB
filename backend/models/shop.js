/**
 * Created by Iryna on 20.09.2014.
 */

var mongoose = require('mongoose'),
    ShopsSchema = new mongoose.Schema({
        address:{
            type: String,
            required:true
        },
        description:{
            type: String,
            required:true
        },
        photoId:{
            type: Number,
            required:true
        },
        shopId:{
            type: Number,
            required:true
        }

    });

module.exports = mongoose.model('shop', ShopsSchema, 'shops');
