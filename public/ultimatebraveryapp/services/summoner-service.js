; (function () {
   angular.module('ultimateBravery')
       .service('SummonerService', SummonerService)
   

   SummonerService.$inject = ['$http', 'LeagueService'];

   function SummonerService($http, LeagueService) {
   




       var ss = this;

     

       ss.getRandChampion = function(champ, LeagueService){
  debugger


           // GETS random champ number from the list of owned champs for that user
       
            let randomChampNumber = Math.floor(Math.random() * Object.keys(champ.champs).length)


            console.log(randomChampNumber)

            // Finds that champ by matching randomChampNumber to our object of owned champs

           var champName = Object.keys(champ.champs).find(function(champ, i){
           
               if(i == randomChampNumber){

                   
                   return champ;
               }
           })

           // Makes the randChamp an object located on var randChamp

           
           var ChampList = JSON.parse(localStorage.getItem("champs"));
           
           var randChamp = ChampList[champName]
          
           var randomSpells = randChamp.spells[Math.floor(Math.random() * randChamp.spells.length)]  
           console.log("actual list of spells", randChamp.spells)
            console.log("Yo spells", randomSpells)
            console.log("You have been assigned", randChamp)
       
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
