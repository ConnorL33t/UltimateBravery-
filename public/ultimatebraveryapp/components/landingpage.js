;(function(){



angular.module('ultimateBravery')
    .component('lPComponent', {
        templateUrl: 'ultimatebraveryapp/templates/landingpage.html',
        controller: LPController
    
    })
        LPController.$inject = ['LeagueService'];


    function LPController (LeagueService){
      console.log(LeagueService)
    }



}());