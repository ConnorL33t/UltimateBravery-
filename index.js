const express = require('express'),
    request = require('request'),
	bodyParser = require('body-parser'),
	uuid = require('node-uuid'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
	chatClients = {},
    path = require('path'),
	rooms = ['general', 'queue', 'party'],
	actualRooms = {
		lobby: {
			room: 'Lobby',
			summoners: {}
		},
		general: {
			room: 'General',
			summoners: {}
		},
		queue: {
			room: 'Queue',
			summoners: {}
		},
		parties: {
			//Dynamically add party rooms
		},
		games: {
			//THIS WILL be the same as parties but different
		}
	};

server.listen(process.env.PORT || 8080);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
// app.use(express.static('images'));


app.get('/summoner/:summonerName', function (req, res) {

    var base = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
        apikey = '?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57',
		url = base + req.params.summonerName + apikey;

    request(url, function (err, response, body) {
        res.send(body)
    })

})

app.get('/summonerstat/:summonerId', function (req, res) {

    var base = 'https://na.api.pvp.net/championmastery/location/NA1/player'
	apikey = '/champions?RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'

	url = base + req.params.summonerId + apikey;

    request(url, function (err, response, body) {
        res.send(body)
    })

})

// begin hell 

io.on('connect', function (socket) {
	socket.on('connected', function(summoner){
		if(!summoner){
			return socket.emit('Invalid Connection')
		}
		connect(socket, {summoner: summoner});
	})

	socket.on('chatmessage', function (data) {
		chatmessage(socket, {});
	});
	socket.on('queueUp', function (data) {
		queueUp(socket, {});
	});
	socket.on('leaveQueue', function (data) {
		leaveQueue(socket, {});
	});
	
	socket.on('disconnect', function () {
		let summoner = chatClients[socket.id];
		if(actualRooms[summoner.room]){
			delete actualRooms[summoner.room].summoners[socket.id];
		} 
		delete chatClients[socket.id];
	});

	socket.on('joinroom', function (data) {
		queueUp(socket, data.room);
	})

});
function connect(socket, summoner) {
	chatClients[socket.id] = summoner;
	// socket.emit('ready', { clientId: data.clientId });
	queueUp(socket, 'lobby');
	// socket.emit('roomslist', { rooms: getRooms() });
}
function disconnect(socket) {
    // let rooms = io.sockets.adapter.roomClients[socket.id];
    // for (let room in rooms) {
	// 	if (room && rooms[room]) {
	// 		leaveQueue(socket, { room: room.replace('/', '') });
	// 	}
	// }
	// delete chatClients[socket.id];


}
function chatmessage(socket, data) {
	socket.broadcast.to(data.room).emit('chatmessage', {
		client:
		chatClients[socket.id], message: data.message, room: data.room
	});
}
function queueUp(socket, room) {
	// get a list of all active rooms
	// var rooms = getRooms();

	// if (rooms.indexOf('/' + data.room) <= 0) {
	// 	socket.broadcast.emit('addroom', { room: data.room });
	// }

	socket.join(room);
	if(room == 'parties'){
		//TODO: do stuff later
	}
	var r = actualRooms[room] = actualRooms[room] || {summoners:{}}
	chatClients[socket.id].room = room; 
	r.summoners[socket.id] = chatClients[socket.id];
	socket.emit('joined', actualRooms[room]);
}
function leaveQueue(socket, data) {
	updatePresence(data.room, socket, 'offline');
	socket.leave(data.room);
	if (!countClientsInRoom(data.room)) {
		io.sockets.emit('removeroom', { room: data.room });
	}
}
function getRooms() {
	return rooms;
}
function getClientsInRoom(socketId, room) {
	var socketIds = io.sockets.adapter.rooms['/' + room];
	var clients = [];

	if (socketIds && socketIds.length > 0) {
		socketsCount = socketIds.lenght;
		for (var i = 0, len = socketIds.length; i < len; i++) {

			if (socketIds[i] != socketId) {
				clients.push(chatClients[socketIds[i]]);
			}
		}
	}

	return clients;
}
function countClientsInRoom(room) {

	if (io.sockets.adapter.rooms['/' + room]) {
		return io.sockets.adapter.rooms['/' + room].length;
	}
	return 0;
}