var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var driverSchema = mongoose.Schema({

    city:String,
FirstName:String,
Role:String,
Address:String,
    carType: String,
    carName:String,
    carNumber:String,
    MobileNumber:String,
    licenseNo:String,
    Email:String,
    Password:String,
  cpwd:String,
  lat:String,
  long:String
 });


driverSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Decrypting Password
driverSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
}

module.exports = mongoose.model('Driver', driverSchema, 'Driver');
