// import dependencies
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


// import modules
const {Users} = require('./utils/users')
const {isRealString} = require('./utils/validation')
const {generateMessage} = require('./utils/message')
// set up server / sockets / path to front end
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
// initialize users and room container 

var users = new Users();
var rooms = new RoomContainer();

// serve

app.use(express.static(publicPath));

// socket events

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('join', (clientData, callback) => {
    // add user to "global" user list (removed later when successfully added to a room)
    var user = users.addUser(clientData.id);
    // add user to an open or new game. 
    var socketsGame = rooms.addUserToGame(clientData);
    // TODO:: purge user from global user list 

    
 
    // this is supposed to tell user what room he is in for chat purposes.
    // callback(`${users.users[clientData.id]} has successfully joined the lobby.`+ room.id);
});

    

    io.to().emit();

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Ultimate Bravery!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('', `${params.name} has joined.`));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from the server.');
    });

    socket.on('disconnect', () => {
        console.log('client disconnected')
    });
});

server.listen(port, () => {
    console.log(
        `port is running on ${port}`
    );
});
