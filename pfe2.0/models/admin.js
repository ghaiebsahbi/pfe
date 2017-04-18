var mongoose = require('mongoose');
  Schema = mongoose.Schema;

var admin = new Schema({
  first_name: {type: String, required: true} ,
  last_name: {type: String, required: true} ,
  username: {type: String, required: true,unique:true} ,
  cin: {type: String, required: true} ,
  adress: {type: String, required: true} ,
  email: {type: String, required: true} ,
  lieu_naissance: {type: String, required: true} ,
  date_naissance: {type: String, required: true} ,
  pwd: {type: String, required: true} ,
  tel: {type: String, required: true} ,
  avatar   : { type: mongoose.Schema.Types.Mixed, required: false,default:'default.jpg' }
},
{versionKey: false}) ;
//Create Admin model
const adminSchema = mongoose.model('admin',admin);

module.exports = adminSchema;
