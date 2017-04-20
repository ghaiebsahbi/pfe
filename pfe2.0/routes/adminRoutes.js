var express = require('express');
var admin = express.Router();
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



//import main.controller
adminController = require('../app/controllers/main.controller');
adminController = require('../app/controllers/admin.controller');


//update photo
admin.post('/upload', upload.any(), adminController.uploadPic);


//visit another users profile
admin.get('/visit:username',adminController.visit);


//Login page
admin.get('/login',adminController.login);
admin.post('/login',adminController.login);

//show all Etudiants
admin.get('/students',adminController.viewAll);

//inbox
admin.get('/inbox',adminController.inbox);

//Home page
admin.get('/admin',adminController.showHome);
//Profile
admin.get('/profile',adminController.showProfile);
admin.post('/profile',adminController.edit);
//Edit profile
admin.post('/edit',adminController.edit);
//Demandes
admin.get('/demandes',adminController.showDemandes);
//show single demande
admin.get('/dem:id',adminController.dem);
//Accept demande
admin.post('/acceptDem',adminController.acceptDem);
//Delete Demande
admin.post('/deleteDem',adminController.deleteDem);
//Demandes POST REQUEST
admin.post('/demande_doc',adminController.demande_doc);

//Logout page
admin.get('/logout',adminController.logout);

//404 not Found
admin.get('*',adminController.show404);


module.exports = admin;
