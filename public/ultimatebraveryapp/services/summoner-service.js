;(function (){
    angular.module('ultimateBravery')
    .service('SummonerService', SummonerService)

    SummonerService.$inject = ['$http'];

    function SummonerService($http){
    

        
        var ss = this;
        // var SummonerInfo = [];

        // function saveM(champs){
        //     localStorage.setItem('champs', JSON.stringify(champs))
        // }
       
        ss.getSummonerProfile = function(summoner, cb){
            if(!summoner){return}

            var base = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
            apikey = '?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
            var url = base+summoner+apikey


             $http.get(url).then(function(response) {
                var summonerObject = response.data;
                console.log(summonerObject)
                return cb(summonerObject)
                // return masterLeagueList()
            }, function(response) {
              
            });

        

        }
    }
}());


// '{{$ctrl.user.summoner}}'