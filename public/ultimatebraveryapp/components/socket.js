; (function () {

  angular.module('ultimateBravery')
    .factory('SocketService', function ($rootScope) {
      var ss = this;
      var socket;
      var CLIENT = CLIENT || {};
      
      return {
        getSocket,
        connect,
        joinRoom,
        getClient
      }
      
      function _update() {
        $rootScope.$evalAsync()
      }

      function getSocket(){
        return socket;
      }

      function connect(summoner) {
        socket = socket || io.connect('http://localhost:8080');

        socket.emit('connected', summoner)

        socket.on('roomslist', function (data) {
          sc.rooms = data.rooms;
          _update();
        })

        socket.on('joined', function (d) {
          console.log('JOINED:', d);
          CLIENT.room = d;
        })

        return socket;
      }

      function joinRoom (room) {
        socket.emit('joinroom', { room: room })
      }

      function getClient(){
        return CLIENT
      }


    })
} ());