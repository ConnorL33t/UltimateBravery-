const express  = require('express'),
    request = require('request'), 
	bodyParser = require('body-parser'), 
    app      = express(),
    server   = require('http').createServer(app),
    io       = require('socket.io').listen(server),
    path = require('path')


server.listen(process.env.PORT || 8080);


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

// begin hell 

io.on('connect', function(data){
  connect(socket, data);
});
io.on('chatmessage', function(data){
  chatmessage(socket, data);
}); 
io.on('queueUp', function(data){
  queueUp(socket, data);
});
io.on('leaveQueue', function(data){
  leaveQueue(socket, data);
}); 
io.on('disconnect', function(){
  disconnect(socket);
 });
function connect(socket, data){
 data.clientId = // uuid fix later
 chatClients[socket.id] = data;
 socket.emit('ready', { clientId: data.clientId });
 queueUp(socket, { room: 'lobby' });
 socket.emit('roomslist', { rooms: getRooms() });
}
function disconnect(socket){
    let rooms = io.sockets.adapter.roomClients[socket.id];
    for(let room in rooms){
  if(room && rooms[room]){
   leaveQueue(socket, { room: room.replace('/','') });
  }
 }
 delete chatClients[socket.id];


}
function chatmessage(socket, data){
 socket.broadcast.to(data.room).emit('chatmessage', { client: 
           chatClients[socket.id], message: data.message, room: data.room });
}
function queueUp(socket, data){
 // get a list of all active rooms
	var rooms = getRooms();

	if(rooms.indexOf('/' + data.room) < 0){
		socket.broadcast.emit('addroom', { room: data.room });
	}

	socket.join(data.room);

	updatePresence(data.room, socket, 'online');

	io.emit('roomclients', { room: data.room, clients: getClientsInRoom(socket.id, data.room) })
}
function leaveQueue(socket, data){
	updatePresence(data.room, socket, 'offline');
	socket.leave(data.room);
	if(!countClientsInRoom(data.room)){
		io.sockets.emit('removeroom', { room: data.room });
	}
}
function getRooms(){
	return Object.keys(io.sockets.adapter.rooms);
}
function getClientsInRoom(socketId, room){
	var socketIds = io.sockets.adapter.rooms['/' + room];
	var clients = [];
	
	if(socketIds && socketIds.length > 0){
		socketsCount = socketIds.lenght;
		for(var i = 0, len = socketIds.length; i < len; i++){

			if(socketIds[i] != socketId){
				clients.push(chatClients[socketIds[i]]);
			}
		}
	}
	
	return clients;
}
function countClientsInRoom(room){

	if(io.sockets.adapter.rooms['/' + room]){
		return io.sockets.adapter.rooms['/' + room].length;
	}
	return 0;
}