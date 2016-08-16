; (function () {



    angular.module('ultimateBravery')
        .component('lPComponent', {
            templateUrl: 'ultimatebraveryapp/templates/landingpage.html',
            controller: LPController

        })
    LPController.$inject = ['$state', 'LeagueService', 'SummonerService'];


    function LPController($state, LeagueService, SummonerService) {
        var $ctrl = this;

        $ctrl.user = {
            summoner: $state.params.summoner,
            champs: {

            }
        }

        $ctrl.$onInit = function () {
            SummonerService.getSummonersChamps($state.params.summoner, function(champMastery){
                console.log(champMastery)
            })

            SummonerService.getSummonerProfile($state.params.summoner, function (summoner) {
             console.log(summoner)
                if(summoner.status){
                    $state.go('login')
                }
                var cleanSummonerName = $state.params.summoner.split(' ').join('').trim().toLowerCase()
                $ctrl.user.summoner = summoner[cleanSummonerName] ? summoner[cleanSummonerName].name : $state.params.summoner;
                $ctrl.user.profileIcon = `/image/lolimages/img/profileicon/${summoner[cleanSummonerName].profileIconId}.png`

                
            })
        } 




        $ctrl.quickmatch = function () {
            $state.go('quickmatch')
        }
        

        $ctrl.rules = function () {
            $state.go('rules')
        }

        $ctrl.toggleChamp = function (champ) {
            if ($ctrl.user.champs[champ.name] && $ctrl.user.champs[champ.name].owned) {
                $ctrl.user.champs[champ.name].owned = false;
            } else {
                $ctrl.user.champs[champ.name] = { owned: true };
            }
        }


        $ctrl.findMatchGame = function (champ, index) {
            debugger


            $state.go('match')


            SummonerService.getRandChampion($ctrl.user);

        
                        
    


            // let randomChampNumber = Math.floor(Math.random() * Object.keys($ctrl.user.champs).length)



            // var champName = Object.keys($ctrl.user.champs).find(function(champ, i){
            //     if(i == randomChampNumber){
            //         return champ;
            //     }
            // })

            // var randChamp = $ctrl.champs[champName];

            // console.log(randomChampNumber)
            // console.log('YOU HAVE BEEN ASSIGNED', randChamp)
            



            // var randChamp = (Object.keys($ctrl.user.champs)).find(function(champ, i){
            //     if(i == randomChampNumber){
            //         return champ;
            //     }
            // })
            
        
        




            
        }

    


        $ctrl.champBtn = "Select All Champions"
        var on = false
        $ctrl.toggleAllChamps = function () {

            on = !on
            if (on != true) {
                $ctrl.champBtn = "Select All Champions"
            } else {
                $ctrl.champBtn = "Un-Select All Champions"
            }
            for (var ch in $ctrl.champArray) {
                var champ = $ctrl.champArray[ch]
                $ctrl.user.champs[champ.name] = {
                    owned: on
                }
            }

        }









        $ctrl.champArray = [];
        LeagueService.getLeagueList(function (champs) {
            $ctrl.champs = champs;
            Object.keys(champs).sort().forEach(function (x, i) {
                $ctrl.champArray.push(champs[x])
            })
            // $ctrl.champArray is an array sorted alphabetically by index, console logging will not work outside of 
            // LeagueService.getLeagueList because of async (gotta love async)
            // also figured out that you can only get 99 champs at once so this function is being executed twice. 

        })

    }


} ());