var mongoose = require('mongoose');
  Schema = mongoose.Schema;

//create Demandes schema
var demande = new Schema({
  first_name: {type: String, required: true} ,
  last_name: {type: String, required: true} ,
  cin: {type: String, required: true} ,
  adress: {type: String, required: true} ,
  classe: {type: String, required: true} ,
  lieu_naissance: {type: String, required: true} ,
  date_naissance: {type: String, required: true} ,
  section: {type: String, required: true} ,
  nature: {type: String, required: true} ,
  date_demande: {type: Date, required: true, default:Date.now } ,
  etat : { type: Boolean, required: true},
  email:{type: String,} ,
  encadreur:{type:String} ,
  binome:{type:String} ,
  description:{type:String} ,
  memoir:{type:String}
},
{versionKey: false}) ;

//Create Etudiant model
const demandeSchema = mongoose.model('demande',demande);
module.exports = demandeSchema;
