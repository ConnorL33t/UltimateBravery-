;(function(){



angular.module('ultimateBravery')
    .component('uBComponent', {
        templateUrl: 'ultimatebraveryapp/templates/homepage.html',
        controller: UBController,
        controllerAs: 'ubc'
    
    })



    UBController.$inject = ['$state', '$stateParams', 'LeagueService']


    function UBController ($state, $stateParams, LeagueService){
        let ubc = this



        ubc.showSummonerProfile = function(){
            $state.go('landingpage')
        }


    }



}());
