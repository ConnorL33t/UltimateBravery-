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
	teams = {},
	actualRooms = {
		lobby: {
			room: 'Lobby',
			summoners: []
		},
		queue: {
			room: 'Queue',
			summoners: []
		},
		parties: {
			//Dynamically add party rooms
		},
		games: {
			queing: [],
			confirmed: {}
		}
	};

function Game(){
	this.id = uuid.v1();
	this.summoners = [];
	this.teams = [{},{}];
	actualRooms.games.queing.push(this);
}

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

// begin AWESOMENESS hell 

io.on('connect', function (socket) {
	socket.on('connected', function (summoner) {
		if (!summoner) {
			return socket.emit('Invalid Connection')
		}
		connect(socket, { summoner: summoner });
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
		leaveRoom(socket.id);
		delete chatClients[socket.id];
	});

	socket.on('back-button', function(){
		leaveRoom(socket.id);
		delete chatClients[socket.id];
	})

	socket.on('joinroom', function (data) {
		queueUp(socket, data.room);
	})

});

function connect(socket, summoner) {
	summoner.socketId = socket.id;
	chatClients[socket.id] = summoner;
	queueUp(socket, 'lobby');
}

function chatmessage(socket, data) {
	socket.broadcast.to(data.room).emit('chatmessage', {
		client:
		chatClients[socket.id], message: data.message, room: data.room
	});
}

function queueUp(socket, room) {
	leaveRoom(socket.id);
	socket.join(room);
	if (room == 'parties') {
		//TODO: do stuff later
	}
	var r = actualRooms[room] = actualRooms[room] || { summoners: [] }
	chatClients[socket.id].room = room;
	r.summoners.push(chatClients[socket.id]);
	socket.emit('joined', actualRooms[room]);
}

function getRooms() {
	return rooms;
}

function leaveRoom(socketId) {
	let summoner = chatClients[socketId];
	if(!summoner){ return }
	let r = actualRooms[summoner.room]
	if (r) {
		let i = r.summoners.indexOf(summoner);
		r.summoners.splice(i, 1);
		//TODO:: broadcast user left
	}
}

function assignGame(){
	let game = games.queing[0] || new Game();
	let players = actualRooms.queue.summoners; 
	var player = players.shift();

	if(Object.keys(game.summoners).length > 10){
		game = new Game();
	}

	if(chatClients[player.id]){
		player.gameId = game.id;
		game.summoners[player.socketId] = player;
	}
	return game;
}

function confirmPlayer(id, game){
	let summoner = chatClients[id];
	if(summoner){
		game.summoners[id].confirmed = true;
	}else{
		delete game.summoners[id]
	}
	//TODO:: io.broadcast???
}

function confirmGame(game){
	actualRooms.games.confirmed[game.id] = game;
	let i = actualRooms.games.queing.indexOf(game);
	actualRooms.games.queing.splice(i, 1);
}