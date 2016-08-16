
; (function () {
    angular.module('ultimateBravery')
        .service('SummonerService', SummonerService)
    

    SummonerService.$inject = ['$http', 'LeagueService'];

    function SummonerService($http, LeagueService) {
    




       var ss = this;

        ss.getRandChampion = function(champ, LeagueService){ 



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
            debugger
            


           // TODO :: make this next function get the object not a string.

            var randChamp = localStorage.getItem(champs[champName], JSON.parse(champs[champName]));
            console.log(randChamp)
            

            console.log('YOU HAVE BEEN ASSIGNED', randChamp)
            
            


           

       }
       // var SummonerInfo = [];

       // function saveM(champs){
       //     localStorage.setItem('champs', JSON.stringify(champs))
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


