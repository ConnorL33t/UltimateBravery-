;(function (){
    angular.module('ultimateBravery')
    .service('LeagueService', LeagueService)

    LeagueService.$inject = ['$http'];

    function SummonerService($http){
        var ls = this;
        var MasterLeagueList = [];

        function saveMasterLeagueList(champs){
            localStorage.setItem('champs', JSON.stringify(champs))
        }
       
        ls.getLeagueList = function(cb){
        var base = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
         summoner = 'placeholder?',
         apikey = 'api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
        var url =  base + summoner + apikey
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {

                
               
                
           
                // return masterLeagueList()
            }, function errorCallback(response) {

            });

        

        }
    }
}());