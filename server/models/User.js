var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    FirstName: String,
  
 MobileNumber: String,
    Email: String,
    Password: String,
   Role:String,
     lat:String,
  long:String
});

//Encrypting Password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Decrypting Password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
}

module.exports = mongoose.model('User', userSchema, 'User');
