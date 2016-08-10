;(function (){
    angular.module('ultimateBravery')
    .service('LeagueService', LeagueService)

    LeagueService.$inject = ['$http'];

    function LeagueService($http){
        var ls = this;
        var MasterLeagueList = [];

        var baseUrl ='https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-42FA944E-296C-4CB9-B918-0474FDBC93BA'

        this.getLeagueList = function(sucessCallback, failCallback){
            var list = getMasterLeagueList();
            if(list){
                return sucessCallback(list);
            }

        $http.get(baseUrl).then(function (response){
            saveMasterLeagueList(response.data.results);
            return sucessCallback(response.data.results);
        }, failCallback);
        }

        function saveMasterLeagueList(list){
            localStorage.setItem('masterLeagueList', JSON.stringify(list));
        }
        function getMasterLeagueList(){
            var list = localStorage.getItem('masterLeagueList');
            if(list){
                masterLeagueList = JSON.parse(list);
            }
            return JSON.parse(list);
        }
    }
}());