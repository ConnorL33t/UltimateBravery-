;(function(){



angular.module('ultimateBravery')
    .component('uBComponent', {
        templateUrl: 'ultimatebraveryapp/templates/homepage.html',
        controller: UBController
        
    
    })



    UBController.$inject = ['$state','LeagueService']


    function UBController ($state, LeagueService){
        let ubc = this



        ubc.showSummonerProfile = function(summoner){
            
            $state.go('landingpage', {summoner: summoner})
        }






    }



}());
