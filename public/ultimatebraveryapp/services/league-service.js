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
            // var list = getMasterLeagueList();
            // if(list){
            //     return sucessCallback(list);
            // }
            $http({
                method: 'GET',
                url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
            }).then(function successCallback(response) {
                var champs = response.data.data;

                for(var champ in champs){
                    champs[champ].img = `/image/lolimages/img/champion/${champ}.png`
                }

                console.log(champs)
                saveMasterLeagueList(champs)
                cb(champs)
                // return masterLeagueList()
            }, function errorCallback(response) {

            });

        

        // function saveMasterLeagueList(data){
        //     localStorage.setItem('masterLeagueList', JSON.stringify(data));
        // }
        // function getMasterLeagueList(){
        //     var localData = localStorage.getItem('masterLeagueList');
        //     if(localData){
        //         masterLeagueList = JSON.parse(localData);
        //     }
        
        //     return JSON.parse(data);
        // }
        }
    }
}());