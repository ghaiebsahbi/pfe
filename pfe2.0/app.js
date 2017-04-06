var express = require('express');
var path = require('path');
var ejs = require('ejs');
var routes = require('./routes/index');
var users = require('./routes/users');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var session = require('express-session')


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var db = 'mongodb://localhost/pfe';
mongoose.connect(db);

var app = express();
app.use(bodyParser.urlencoded({extended: false}));

//test session
app.use(session({
  secret: 'ih8node',
  resave: false,
  saveUninitialized: true
}));


//view engine
app.set('view engine','ejs');
//static folder
app.use(express.static(__dirname + '/public'));


app.listen(port, (req, res) =>{
  console.log('listening to port '+port);
});



app.use('/',routes);
