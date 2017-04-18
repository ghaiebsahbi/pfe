var express = require('express');
var path = require('path');
var bcrypt = require('bcryptjs');
var ejs = require('ejs');
var adminRoutes = require('./routes/adminRoutes');
var routes = require('./routes/index');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var session = require('express-session');


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

io.sockets.on('connection',function(socket){
  socket.on('new user',function(data, callback){

    if(data in users){
      callback(false);
    }else{

      callback(true);
      socket.nickname = data;
      users[socket.nickname] = socket;
      updateNicknames();
    }
  });
  function updateNicknames(){
    io.sockets.emit('usernames', Object.keys(users));
  }
  socket.on('send message',function(data){
    io.sockets.emit('new message',{msg:data,nick:socket.nickname});
  });
  socket.on('disconnect', function(data){
    if(!socket.nickname) return;
    delete users [socket.nickname];
    updateNicknames();
  });
});

//test session
app.use(session({
  secret: 'ih8node',
  resave: false,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  saveUninitialized: true
}));


//view engine
app.set('view engine','ejs');
//static folder
app.use(express.static(__dirname + '/public'));


server.listen(port, (req, res) =>{
  console.log('listening to port '+port);
});


app.use('/admin',adminRoutes);
app.use('/',routes);
