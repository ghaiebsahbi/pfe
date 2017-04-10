var express = require('express');
var io = require('socket.io');
users = [];
connections = [];

  io.sockets.on('connection',function(socket){
  connections.push(socket);
  console.log('connected %s sockets connected',connections.length);

  socket.on('disconnect',function(data){
    //disconnect
    connections.splice(connections.indexOf(socket),1);
    console.log('Disconnected %s sockets connected', connections.length);
  });
  //send message
  socket.on('send message',function(data){
    // console.log(data);
    io.sockets.emit('new message',{msg:data});
  });
  socket.on('new user',function(data){
    // console.log(data);
    socket.username = req.session.username;
    users.push(socket.username);
    updateUsernames();
  });
  function updateUsernames(){
    io.sockets.emit('get users,usernames');
  }
});
