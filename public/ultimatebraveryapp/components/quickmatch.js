;(function(){

    angular.module('ultimateBravery')
        .component('qMComponent', {
            templateUrl: 'ultimatebraveryapp/templates/quickmatch.html',
            controller: QMController
        })



        QMController.$inject = ['$state', 'LeagueService', 'SummonerService']




        function QMController($state, LeagueService, SummonerService){
            let qm = this;



        }
}());