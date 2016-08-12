;(function(){

    angular.module('ultimateBravery')
        .component('gMComponent', {
            templateUrl: 'ultimatebraveryapp/templates/gamematch.html',
            controller: GMController
        })



        GMController.$inject = ['$state', 'LeagueService', 'SummonerService']




        function GMController($state, LeagueService, SummonerService){
            let gm = this;



        }
}());