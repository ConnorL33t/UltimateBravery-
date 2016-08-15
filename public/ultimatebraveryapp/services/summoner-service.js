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
        ss.summoner = ''
        ss.getSummonerProfile = function(summoner, cb){
            if(!summoner){return}
        ss.summoner = summoner
             $http.get('/summoner/'+summoner).then(function(response) {
                var summonerObject = response.data;
                console.log(summonerObject)
                 ss.getStats(ss.summoner, summonerObject)    
                return cb(summonerObject)
                // return masterLeagueList()
            }, function(response) {
              
            });
            // for(var summoner in summonerObject){
            //     debugger
            //     summoner[summonerObject].profileicon = `/image/lolimages/img/profileicon/${summoner}.png`
            // }

        ss.getStats = function(summoner, summonerObject){
          
        }

        }
    }
}());


// '{{$ctrl.user.summoner}}'