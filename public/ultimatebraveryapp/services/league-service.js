;(function (){
    angular.module('ultimateBravery')
    .service('LeagueService', LeagueService)

    LeagueService.$inject = ['$http'];

    function LeagueService($http){
        var ls = this;
        var MasterLeagueList = [];
        var MasterSpellList = [];

        function saveMasterLeagueList(champs){
            localStorage.setItem('champs', JSON.stringify(champs))
        }

         function saveMasterSpellList(champSpells){
            localStorage.setItem('champSpells', JSON.stringify(champSpells))
        }
       
        this.getLeagueList = function(cb){

            $http({
                method: 'GET',
                url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
            }).then(function successCallback(response) {
                var champs = response.data.data;
                

                
                for(var champ in champs){
                    champs[champ].img = `/image/lolimages/img/champion/${champ}.png`
                    champs[champ].spells = [
                        `/image/lolimages/img/spell/${champ}Q.png`,
                        `/image/lolimages/img/spell/${champ}W.png`,
                        `/image/lolimages/img/spell/${champ}E.png`
                        ]
                        if(champs[champ].img === `/image/lolimages/img/champion/Udyr.png`){
                           champs[champ].spells = [
                        `/image/lolimages/img/spell/${champ}Q.png`,
                        `/image/lolimages/img/spell/${champ}W.png`,
                        `/image/lolimages/img/spell/${champ}E.png`,
                        `/image/lolimages/img/spell/${champ}R.png`
                        ]
                        }
                }
               
                saveMasterLeagueList(champs)
                cb(champs)
           
                // return masterLeagueList()
            }, function errorCallback(response) {

            });


        

      
        }


        
    }
}());