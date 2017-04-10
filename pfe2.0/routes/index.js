var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//require shcema and models
//var etudiant = require('././models/database');
var Etudiant = require('../models/database');

//import main.controller
mainController = require('../app/controllers/main.controller');
adminController = require('../app/controllers/admin.controller');


//Login page
router.get('/login',mainController.login);
router.post('/login',mainController.login);

//inbox
router.get('/inbox',mainController.inbox);

//Home page
router.get('/',mainController.showHome);
//Profile
router.get('/profile',mainController.showProfile);
//Edit profile
router.post('/edit',mainController.edit);
//Demandes
router.get('/demandes',mainController.showDemandes);
//Demandes POST REQUEST
router.post('/demande_doc',mainController.demande_doc);
//insertion etudiant
router.post('/register',mainController.register);
//Logout page
router.get('/logout',mainController.logout);

//404 not Found
router.get('*',mainController.show404);

module.exports = router;
