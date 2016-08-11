;(function (){
    angular.module('ultimateBravery')
    .service('LeagueService', LeagueService)

    LeagueService.$inject = ['$http'];

    function LeagueService($http){
        var ls = this;
        var MasterLeagueList = [];

        function saveMasterLeagueList(champs){
            localStorage.setItem('champs', JSON.stringify(champs))
        }
       
        ls.getLeagueList = function(cb){
        var base = '',
         summoner = '',
         apikey = ''
        var url =  base + summoner + apikey
            $http({
                method: 'GET',
                url: url
            }).then(function successCallback(response) {
`
                }
               
                
           
                // return masterLeagueList()
            }, function errorCallback(response) {

            });

        

        }
    }
}());