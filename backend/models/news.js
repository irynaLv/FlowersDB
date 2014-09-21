/**
 * Created by Iruna on 21.05.14.
 */
/**
 * Created by Iruna on 21.05.14.
 */

var mongoose = require('mongoose'),
    NewsSchema = new mongoose.Schema({
        title:{
            type: String,
            required:true
        },
        owner:{
            type: String,
            required:true
        },
        accessLayer:{
            type: Number,
            required:true
        },
        description:{
            type: String,
            required:true
        },
        fileName:{
            type: String,
            required:true
        },
        uploadDate:{
            type: Data,
            required:true
        },
        titleUser:{
            type:String,
            required:true
        },
        sexUser:{
            type:String,
            required:true
        },
        newsId:{
            type: Number,
            required:true,
            unique:true
        },
        documentId:{
            type: Number,
            required:true
        }
    });

module.exports = mongoose.model('news', NewsSchema, 'news');
