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

             $http.get('/summoner/'+summoner).then(function(response) {
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