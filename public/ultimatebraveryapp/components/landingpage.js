;(function(){



angular.module('ultimateBravery')
    .component('lPComponent', {
        templateUrl: 'ultimatebraveryapp/templates/landingpage.html',
        controller: LPController
    
    })
        LPController.$inject = ['$state','LeagueService'];


    function LPController ($state, LeagueService){
    var $ctrl = this;

    $ctrl.toggle = function(){
        
    }
    LeagueService.getLeagueList(function(champs){
        $ctrl.champs = champs
       
    
    })

    
    

}


}());