var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//to do: add other user properties
var User = new Schema({
    username: String,
    password: String
});

var User = mongoose.model('User', User);
module.exports = User;