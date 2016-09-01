;(function(){

    angular.module('ultimateBravery')
        .component('qRComponent', {
            templateUrl: 'ultimatebraveryapp/templates/queue.html',
            controller: QRController
        })



        QRController.$inject = ['$state', 'SocketService', 'SummonerService', 'LeagueService']




        function QRController($state, SocketService, SummonerService, LeagueService){
            var qr = this;
            
            // LeagueService.getItems(function (items) {
            //    qr.items = items;
            // })
            console.log(SummonerService.getRandomData())
            var socket = SocketService.getSocket();
            qr.client = SocketService.getClient();
            var queue = qr.client.room
            qr.summoners = []
            var summoners = queue.summoners 
            for (var i = 0; i < summoners.length; i++) {
                var client = summoners[i];
                var summName = Object.keys(client.summoner)[0]
                client.summoner.name = client.summoner[summName].name
               qr.summoners.push(client.summoner)
                
            }
            console.log(qr.items)
        }
}());