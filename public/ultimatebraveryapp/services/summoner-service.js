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
       
        ss.getSummonerProfile = function(cb){
        
            
        

            var base = 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
            summoner = '{{$ctrl.user.summoner}}',
            apikey = 'api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
            var url = base+summoner+apikey


             $http({
                method: 'GET',
                url: url
            
            }).then(function successCallback(response) {
        
        

        
                var summonerObject = response.data;
                console.log(summonerObject)

                
               
                
           
                // return masterLeagueList()
            }, function errorCallback(response) {

            });

        

        }
    }
}());


// '{{$ctrl.user.summoner}}'