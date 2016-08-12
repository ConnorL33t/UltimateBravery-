var express = require('express');
var http = require('http');
var app = require('express')();
var request = require('request');
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
<<<<<<< HEAD
server.listen(8080);
=======
server.listen(process.env.PORT || 8080);
>>>>>>> ab72110566b8d5dbfb15a82ae127ef65173d1cca

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

app.get('/summoner/:summonerName', function (req, res) {

    var base = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
        apikey = '?api_key=RGAPI-1FD38CB3-6687-4D45-8D92-925AA6454D16',
    url = base + req.params.summonerName + apikey;

    request(url, function(err, response, body){
        res.send(body)
    })

})

var usernames = {};

var rooms = ['Lobby'];

io.sockets.on('connection', function (socket) {
    socket.on('adduser', function (username) {
        socket.username = username;
        socket.room = 'Lobby';
        usernames[username] = username;
        socket.join('Lobby');
        socket.emit('updatechat', 'SERVER', 'you have connected to Lobby');
        socket.broadcast.to('Lobby').emit('updatechat', 'SERVER', username + ' has connected to this room');
        socket.emit('updaterooms', rooms, 'Lobby');
    });

    socket.on('create', function (room) {
        rooms.push(room);
        socket.emit('updaterooms', rooms, socket.room);
    });

    socket.on('sendchat', function (data) {
        io.sockets["in"](socket.room).emit('updatechat', socket.username, data);
    });

    socket.on('switchRoom', function (newroom) {
        var oldroom;
        oldroom = socket.room;
        socket.leave(socket.room);
        socket.join(newroom);
        socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + ' has joined this room');
        socket.emit('updaterooms', rooms, newroom);
    });

    socket.on('disconnect', function () {
        delete usernames[socket.username];
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });
});