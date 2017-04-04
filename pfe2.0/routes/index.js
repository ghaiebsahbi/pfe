var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//require shcema and models
//var etudiant = require('././models/database');

var Schema = mongoose.Schema;

var etudiant = new Schema({
  first_name: {type: String} ,
  last_name: {type: String} ,
  email: {type: String}

  //date_naissance: {type:Date , required: true } ,
  //pwd: {type: String,required: true } ,
  //cin: {type: Number,required: true }
},
{versionKey: false}) ;

//import main.controller
mainController = require('../app/controllers/main.controller');


  //Login page
  router.get('/login',mainController.login);
  //Home page
  router.post('/',mainController.showHome);

 //routes getEtudiant
//router.get('/etudiant',mainController.showEtudiant);
//Profile
router.get('/profile',mainController.showProfile);
//Demandes
router.get('/demandes',mainController.showDemandes);
//insertion FAke
router.post('/register',mainController.register);


//404 not Found
router.get('*',mainController.show404);




//router.post('/insert/:first_name/:last_name/:email',mainController.insert);

// exports.home = function(req, res){
//   res.render('index', {
//     name:"raymond"
//     });
// };
//
// exports.profile = function(req, res){
//   res.render('profile');
// };
//
//
// exports.demandes = function(req, res){
//   res.render('demandes');
// };

module.exports = router;
