// import dependencies
const path = require('path');
const http = require('http');
const express = require('express');
const routes = require('./routes/routes');
const socketIO = require('socket.io');
// models 
const RoomContainer = require('./models/game_container_schema');
const {Game} = require('./models/game_schema');
const {Player} = require('./models/player_schema');
const {Summoner} = require('./models/summoner_schema');
const {Team} = require('./models/team_schema');


const {isRealString} = require('./utils/validation');
const {generateMessage} = require('./utils/message');
// set up server / sockets / path to front end
const publicPath = path.join(__dirname, './public');
const port = 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
// room container perhaps have NA / EU etc., room containers in the future? 
var roomContainer = new RoomContainer();

roomContainer.Games.push(new Game());
// initialize and room container 
// var rooms = new RoomContainer();
// serve





app.use(express.static(publicPath));
// validate summoner name
routes(app)

// socket events
io.on('connection', (socket) => {
    socket.on('join', (data) => {
    

    // console.log('new user connected');
    // socket.on('join', (clientData) => {
    //     socket.emit('newMessage', generateMessage('Admin', 'Welcome to the lobby, when 10 players have joined, the randomization will begin.'))
    //     // add user to an open or new game.
    //     var currentGame = rooms.addUserToGame(socket.id);
    //     currentGameID = currentGame.getId();
    //     socket.join(currentGameID);
    //     var player = currentGame.getPlayer(socket.id)
    //     player.requestData(socket);
    //     console.log(socket.id + ' has joined ' + currentGameID)
    //     socket.emit('game', `${currentGameID}`)
    //    if(currentGame.summoners.length === 10) {
    //         currentGame.full = true;
    //         rooms.randomizeGame(currentGame);
    //    } else {
    //        currentGame.full = false;
    //    } 
    });
    // io.to().emit();
    // socket.emit('newMessage', generateMessage('Admin', 'Welcome to Ultimate Bravery!'));
    // socket.broadcast.to(params.room).emit('newMessage', generateMessage('', `${params.name} has joined.`));
    // socket.on('createMessage', (message, callback) => {
    //     io.emit('newMessage', generateMessage(message.from, message.text));
    //     callback('this is from the server.');
    // });
    socket.on('disconnect', () => {
        // rooms.removeUser returns game / socket room ID
        var room = rooms.removeUser(socket.id)
        socket.leave(room);
        console.log (socket.id + ' has left ' + room)
        console.log('client disconnected')
    });
    // socket.on('champions', () => {
    //     var room = rooms.getUsersGame(socket.id)
    //     var user = room.ge 
    // })
    // socket.on('summoner name', () => {
    // })
});
server.listen(port, () => {
    console.log(
        `port is running on ${port}`
    );

});
