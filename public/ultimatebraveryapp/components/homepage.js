;(function(){



angular.module('ultimateBravery')
    .component('uBComponent', {
        templateUrl: 'ultimatebraveryapp/templates/homepage.html',
        controller: UBController
        
    
    })



    UBController.$inject = ['$state','LeagueService', 'SummonerService']


    function UBController ($state, LeagueService, SummonerService){
        let ubc = this



        ubc.showSummonerProfile = function(summoner){
            
            $state.go('landingpage', {summoner: summoner})

            SummonerService.getSummonerProfile(function(summonerObject){
                

            })


        }






    }



}());
