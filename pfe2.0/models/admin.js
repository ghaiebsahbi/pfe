var mongoose = require('mongoose');
  Schema = mongoose.Schema;

var admin = new Schema({
  first_name: {type: String, required: true} ,
  last_name: {type: String, required: true} ,
  username: {type: String, required: true} ,
  cin: {type: String, required: true} ,
  email: {type: String, required: true} ,
  pwd: {type: String, required: true} ,
  poste: {type: String, required: true} ,
},
{versionKey: false}) ;
//Create Admin model
const adminSchema = mongoose.model('admin',admin);

module.exports = adminSchema;
