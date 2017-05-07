var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    firstname: String,
    middlename: String,
    lastname: String,
    email: String,
    birthdate: String,
    username: String,
    password: String
});

var User = mongoose.model('User', User);
module.exports = User;