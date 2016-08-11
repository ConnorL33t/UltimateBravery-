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
        Object.keys(champs).sort().forEach(function (x, i){
             console.log(x, champs[x])           
        })

        $ctrl.champs = champions
       
    
    })

    
    

}


}());