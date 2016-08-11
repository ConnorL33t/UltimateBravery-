;(function(){

    angular.module('ultimateBravery')
        .component('gMComponent', {
            templateUrl: 'ultimatebraveryapp/templates/gamematch.html',
            controller: GMController
        })



        GMController.$inject = ['$state', 'LeagueService']




        function GMController($state, LeagueService){
            let gm = this;



        }
}());