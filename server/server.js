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
// validate summoner name
app.get('/summoner/:summonerName', function (req, res) {
    var base = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
        apikey = '?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57',
		url = base + req.params.summonerName + apikey;

    request(url, function (err, response, body) {
        res.send(body)
    })

})



// socket events
io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('join', (clientData) => {
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the lobby, when 10 players have joined, the randomization will begin.'))
        // add user to an open or new game.
        var currentGame = rooms.addUserToGame(socket.id);
        currentGameID = currentGame.getId();
        socket.join(currentGameID);
        var player = currentGame.getPlayer(socket.id)
        player.requestData(socket);
        console.log(socket.id + ' has joined ' + currentGameID)
        socket.emit('game', `${currentGameID}`)
       if(currentGame.summoners.length === 10) {
            currentGame.full = true;
            currentGame.gameIsFull();      
       } else {
           currentGame.full = false;
       } 
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
