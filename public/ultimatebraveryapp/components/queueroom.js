;(function(){

    angular.module('ultimateBravery')
        .component('qRComponent', {
            templateUrl: 'ultimatebraveryapp/templates/queue.html',
            controller: QRController
        })



        QRController.$inject = ['$state', 'LeagueService', 'SummonerService']




        function QRController($state, LeagueService, SummonerService){
            var qr = this;



        }
}());