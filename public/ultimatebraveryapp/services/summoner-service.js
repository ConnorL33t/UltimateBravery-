; (function () {
    angular.module('ultimateBravery')
        .service('SummonerService', SummonerService)

    SummonerService.$inject = ['$http'];

    function SummonerService($http) {



        var ss = this;
        // var SummonerInfo = [];

        // function saveM(champs){
        //     localStorage.setItem('champs', JSON.stringify(champs))
        // }
        ss.summoner = ''
        ss.getSummonerProfile = function (summoner, cb) {
            if (!summoner) { return }
            $http.get('/summoner/' + summoner).then(function (response) {
                var summonerObject = response.data;
                return cb(summonerObject)
                
            
            
            })
            };
        
        ss.getSummonersChamps = function(summoner, cb){
            var summoner = summoner
            if(!summoner){return}
            $http.get('/summoner/'+ summoner).then(function(response){
                // console.log(response.data)
            return console.log(response.data[summoner].id), $http.get('/summonerstat/'+ response.data[summoner].id).then(function(response){

              var champMastery = response.data
              return cb(champMastery)

            })
            })
        }
            }
    
} ());