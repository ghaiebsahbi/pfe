var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
})

var upload = multer({ storage: storage })
//require shcema and models
//var etudiant = require('././models/database');
var Etudiant = require('../models/database');

//import main.controller
mainController = require('../app/controllers/main.controller');
adminController = require('../app/controllers/admin.controller');

//update photo
router.post('/upload', upload.any(), mainController.uploadPic);

//visit another users profile
//router.get('/visit/:username',mainController.visit);

//dem router
router.get('/dem',mainController.dem);

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
router.get('/demandes',mainController.dem);
//Demandes POST REQUEST
router.post('/demande_doc',mainController.demande_doc);
//insertion etudiant
router.post('/register',mainController.register);
//Logout page
router.get('/logout',mainController.logout);

//404 not Found
router.get('*',mainController.show404);

module.exports = router;
