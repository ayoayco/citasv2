var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    username: String,
    password: String
});
var User = mongoose.model('User', User);
module.exports = User;