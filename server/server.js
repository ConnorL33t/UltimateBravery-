// import dependencies
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


// import modules
const {isRealString} = require('./utils/validation');
const {generateMessage} = require('./utils/message');
const {RoomContainer} = require('./models/roomcontainer');
// set up server / sockets / path to front end
const publicPath = path.join(__dirname, '../public');
const port = 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
// initialize and room container 
var rooms = new RoomContainer();

// serve

app.use(express.static(publicPath));

// socket events

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('join', (clientData) => {
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the lobby, when 10 players have joined, the randomization will begin.'))
        // add user to an open or new game.
        var currentGame = rooms.addUserToGame(clientData);
        currentGameID = currentGame.getId();
        socket.join(currentGameID);
        socket.emit('game', `${currentGameID}`)
        //    io.to(gameId).emit('updateUsersList', currentGame.getRoomsPlayers());
        //   users.removeUser(socket.id);




    });



    // io.to().emit();

    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to Ultimate Bravery!'));
    // socket.broadcast.to(params.room).emit('newMessage', generateMessage('', `${params.name} has joined.`));

    // socket.on('createMessage', (message, callback) => {
    //     io.emit('newMessage', generateMessage(message.from, message.text));
    //     callback('this is from the server.');
    // });

    socket.on('disconnect', () => {

        console.log('client disconnected')
    });
});

server.listen(port, () => {
    console.log(
        `port is running on ${port}`
    );
});
