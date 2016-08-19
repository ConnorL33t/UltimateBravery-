; (function () {

  angular.module('ultimateBravery')
    .factory('SocketService', function ($rootScope) {
      var ss = this;
      var socket;
      var CLIENT = CLIENT || {};
      window.onhashchange = getSocket
      
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
        if(socket){
          return socket.emit('back-button')
        }
        socket = socket || io.connect('http://localhost:8080');
        return socket;
      }

      function connect(summoner) {
        socket.emit('connected', summoner)

        socket.on('roomslist', function (data) {
          sc.rooms = data.rooms;
          _update();
        })

        socket.on('joined', function (d) {
          CLIENT.room = d;
          _update()
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