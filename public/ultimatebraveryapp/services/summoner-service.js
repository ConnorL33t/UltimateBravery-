; (function () {
   angular.module('ultimateBravery')
       .service('SummonerService', SummonerService)
   

   SummonerService.$inject = ['$http', 'LeagueService'];

   function SummonerService($http, LeagueService) {
   
 



       var ss = this;
       ss.build = {}
     

       ss.getRandChampion = function(champ, LeagueService){
 
            let randomChampNumber = Math.floor(Math.random() * Object.keys(champ.champs).length)
            console.log(randomChampNumber)
           var champName = Object.keys(champ.champs).find(function(champ, i){
               if(i == randomChampNumber){ 
                   return champ;
               }
           })

           var ChampList = JSON.parse(localStorage.getItem("champs"));   
           var randChamp = ChampList[champName]
           var randomSpells = randChamp.spells[Math.floor(Math.random() * randChamp.spells.length)]  
           console.log("actual list of spells", randChamp.spells)
            console.log("Yo spells", randomSpells)
            console.log("You have been assigned", randChamp)
       
       }
      ss.getRand 
      ss.getRandMastery = function (keystone, LeagueService){
  
       let randomKeystoneNumber = Math.floor(Math.random() * Object.keys(keystone).length)
       console.log(randomKeystoneNumber)
        var keystoneName = Object.keys(keystone).find(function(keystone, i){
          if( i == randomKeystoneNumber){
            return keystone
          }
        })

        var KeystoneList = JSON.parse(localStorage.getItem("keystone"));   
        var randKeystone = KeystoneList[keystoneName]
        console.log("Keystone", randKeystone)
      }

      ss.getRandSumms = function (desiredSS, LeagueService){
        let randomSummNumber = Math.floor(Math.random() * Object.keys(desiredSS).length)
        console.log(randomSummNumber)
        debugger
        var summsName = Object.keys(desiredSS).find(function(desiredSS, i){
          if(i == randomSummNumber){
            return desiredSS
          }
        })
       debugger
        console.log("Summoner Spells :", desiredSS[summsName])
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
           
           return  $http.get('/summonerstat/'+ response.data[summoner].id).then(function(response){

             var champMastery = response.data
             return cb(champMastery)


           })
           })
       }

           }
   
} ());
