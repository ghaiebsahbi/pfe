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
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
app.use(bodyParser.urlencoded({extended: false}));

//test socket io

users = [];
connections = [];

  io.sockets.on('connection',function(socket){
  connections.push(socket);
  for(i in connections){  console.log(connections[i]);}

  console.log('connected %s sockets connected',connections.length);
  socket.on('join', function (data) {
  socket.join(data.username);
  });
  socket.on('disconnect',function(data){
    //disconnect
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected %s sockets connected', connections.length);
  });
  //send message
  socket.on('send message',function(data){
    // console.log(data);
    io.sockets.in('username').emit('new message',{msg:data});
  });
  // socket.on('new user',function(data){
  //   // console.log(data);
  //   socket.username = req.session.username;
  //   users.push(socket.username);
  //   updateUsernames();
  // });
  function updateUsernames(){
    io.sockets.emit('get users,usernames');
  }
});


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


server.listen(port, (req, res) =>{
  console.log('listening to port '+port);
});



app.use('/',routes);
