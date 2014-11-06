/**
 * Created with JetBrains WebStorm.
 * User: ikush
 * Date: 4/10/14
 * Time: 8:09 PM
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'),
autoIncrement = require('mongoose-auto-increment');

// End of dependencies.

var UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: Number,
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    id:{
        type: Number,
        unique:true,
        required:true
    }
});

// generating a hash
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return this.password === password;
};

UserSchema.plugin(autoIncrement.plugin, { model: 'users', field: 'id' });

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);
