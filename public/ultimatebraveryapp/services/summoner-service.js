; (function () {
    angular.module('ultimateBravery')
        .service('SummonerService', SummonerService)

    SummonerService.$inject = ['$http'];

    function SummonerService($http) {
    



        var ss = this;

        ss.getRandChampion = function(champ){ 

            console.log(champ)
            console.log(Object.keys(champ.champs))


            // GETS random champ number from the list of owned champs for that user
        
             let randomChampNumber = Math.floor(Math.random() * Object.keys(champ).length)

             console.log(randomChampNumber)


             // Finds that champ by matching randomChampNumber to our object of owned champs

            var champName = Object.keys(champ.champs).find(function(champ, i){
            
                if(i == randomChampNumber){
                    debugger
                    return champ;
                }
            })

            console.log(champName)
            

            // TODO :: make this next function get the object not a string.

            // var randChamp = [champName];

            // console.log('YOU HAVE BEEN ASSIGNED', randChamp)
            
            

            

        }
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
            $http.get('/summoner/'+ summoner).then(function(result){
    
            return $http.get('/summonerstat/', {params: {"created_by": result.data[summoner].id}}).then(function(response){

              var champMastery = response.data
              console.log(champMastery)
              return cb(champMastery)

            })
            })
        }
            }
    
} ());
