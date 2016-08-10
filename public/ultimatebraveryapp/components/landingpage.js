;(function(){



angular.module('ultimateBravery')
    .component('lPComponent', {
        templateUrl: 'ultimatebraveryapp/templates/landingpage.html',
        controller: LPController
    
    })
        LPController.$inject = ['$state','LeagueService'];


    function LPController ($state, LeagueService){
    var $ctrl = this;
    LeagueService.getLeagueList(function(champs){
        $ctrl.champs = champs
       
    // var sortChamps = [];
    //     for(var champ in champs){
    //         champ.push(sortChamps)
    //         sortChamps.sort(function(a,b){
    //             return a[1] - b[1]
    //         })
        
    })

    
    

}


}());