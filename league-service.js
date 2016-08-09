;(function (){

    angular.service('LeagueService', LeagueService)

    LeagueService.$inject = ['$http'];

    function LeagueService($http){
        var ls = this;
        var MasterLeagueList = [];

        var baseUrl ='https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/RiotSchmick?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'

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
        }
    }
})