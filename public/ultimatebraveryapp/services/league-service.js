;(function (){
    angular.module('ultimateBravery')
    .service('LeagueService', LeagueService)

    LeagueService.$inject = ['$http'];

    function LeagueService($http){
        var ls = this;
        var MasterLeagueList = [];

       
        ls.getLeagueList = function(sucessCallback, failCallback){
            var list = getMasterLeagueList();
            if(list){
                return sucessCallback(list);
            }
            $http({
                method: 'GET',
                url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
            }).then(function successCallback(response) {
                saveMasterLeagueList(response.data.results)
                console.log(response)
                return masterLeagueList()
            }, function errorCallback(response) {

            });

        

        function saveMasterLeagueList(data){
            localStorage.setItem('masterLeagueList', JSON.stringify(data));
        }
        function getMasterLeagueList(){
            var data = localStorage.getItem('masterLeagueList');
            if(data){
                masterLeagueList = JSON.parse(list);
            }
        
            return JSON.parse(list);
        }
        }
    }
}());