var mongoose = require('mongoose');
  Schema = mongoose.Schema;

var etudiant = new Schema({
  first_name: {type: String, required: true} ,
  last_name: {type: String, required: true} ,
  username: {type: String, required: true} ,
  cin: {type: String, required: true} ,
  adress: {type: String, required: true} ,
  email: {type: String, required: true} ,
  lieu_naissance: {type: String, required: true} ,
  date_naissance: {type: String, required: true} ,
  section: {type: String, required: true} ,
  classe: {type: String, required: true} ,
  pwd: {type: String, required: true} ,
  tel: {type: String, required: true} ,


},
{versionKey: false}) ;

//Create Etudiant model
const etudiantSchema = mongoose.model('etudiant',etudiant);



module.exports = etudiantSchema;
