;(function(){



angular.module('ultimateBravery')
    .component('lPComponent', {
        templateUrl: 'ultimatebraveryapp/templates/landingpage.html',
        controller: LPController
    
    })
        LPController.$inject = ['$state', '$stateParams', 'LeagueService'];


    function LPController ($state, $stateParams, LeagueService){
    LeagueService.getLeagueList()

}


}());