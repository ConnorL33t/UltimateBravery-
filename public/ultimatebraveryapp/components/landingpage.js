; (function () {



    angular.module('ultimateBravery')
        .component('lPComponent', {
            templateUrl: 'ultimatebraveryapp/templates/landingpage.html',
            controller: LPController

        })
    LPController.$inject = ['$state', 'LeagueService'];


    function LPController($state, LeagueService) {
        var $ctrl = this;

        $ctrl.user = {
            champs: {
                
            }
        }



        $ctrl.toggleChamp = function (champ) {
            if($ctrl.user.champs[champ.name] && $ctrl.user.champs[champ.name].owned){
                $ctrl.user.champs[champ.name].owned = false; 
            }else{
                $ctrl.user.champs[champ.name] = {owned: true};
            }
        }

        var on = false
        $ctrl.toggleAllChamps = function(){
            on = !on
            for(var ch in $ctrl.champArray){
                var champ = $ctrl.champArray[ch]
                $ctrl.user.champs[champ.name] = {
                    owned : on
                  
                }
            }
        }

        
        $ctrl.champArray = [];
        LeagueService.getLeagueList(function (champs) {
            Object.keys(champs).sort().forEach(function (x, i) {
                $ctrl.champArray.push(champs[x])
            })
            // $ctrl.champArray is an array sorted alphabetically by index, console logging will not work outside of 
            // LeagueService.getLeagueList because of async (gotta love async)
            // also figured out that you can only get 99 champs at once so this function is being executed twice. 
             
       
        })





    }


} ());