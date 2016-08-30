; (function () {
  angular.module('ultimateBravery')
    .service('SummonerService', SummonerService)


  SummonerService.$inject = ['$http', 'LeagueService'];

  function SummonerService($http, LeagueService) {





    var ss = this;
    ss.build = {}


    ss.getRandChampion = function (champ, LeagueService) {
      var ChampList = JSON.parse(localStorage.getItem("champs"));
      var randomChampNumber = Math.floor(Math.random() * Object.keys(champ.champs).length)
      var champions = Object.keys(champ.champs)
      var randChamp = champions[randomChampNumber]
      var randomChampion = ChampList[randChamp]
      console.log(randomChampion)
      var randomSpells = randomChampion.spells[Math.floor(Math.random() * randomChampion.spells.length)]
      console.log("Yo spell", randomSpells)
      console.log("You have been assigned", randChamp)

    }


    ss.getRandMastery = function (keystone, LeagueService) {
      //Select eystone into an array
      var keystoneList = Object.keys(keystone)
      //Get a random key id 
      var randomKeystoneNumber = Math.floor(Math.random() * Object.keys(keystone).length)
   
      var keystoneNum = keystoneList[randomKeystoneNumber]
      // Store random keystone
      var randKeystone = keystone[keystoneNum]
      console.log("Keystone", randKeystone)
    }

    ss.getRandSumms = function (desiredSS, LeagueService) {
      getRandomSummoners = function () {
        var randomSummNumber = Math.floor(Math.random() * Object.keys(desiredSS).length)
        var summs = Object.keys(desiredSS).find(function (desiredSS, i) {
          if (i == randomSummNumber) {
            return desiredSS
          }
        })
        return desiredSS[summs]
      }

      summonerSpells = {

      }
      var summ1 = getRandomSummoners();
      summonerSpells.summ1 = summ1
      for (; !summonerSpells.summ2;) {
        var summ2 = getRandomSummoners();
        if (summ1 != summ2) {
          summonerSpells.summ2 = summ2

        }
      }
      console.log(summonerSpells)
    }

    ss.summoner = ''
    ss.getSummonerProfile = function (summoner, cb) {
      if (!summoner) { return }
      $http.get('/summoner/' + summoner).then(function (response) {
        var summonerObject = response.data;
        return cb(summonerObject)



      })
    };

    ss.getSummonersChamps = function (summoner, cb) {
      var summoner = summoner
      if (!summoner) { return }
      $http.get('/summoner/' + summoner).then(function (response) {

        return $http.get('/summonerstat/' + response.data[summoner].id).then(function (response) {

          var champMastery = response.data
          return cb(champMastery)


        })
      })
    }




    ss.getRandBuild = function (items, LeagueService) {
      var build = []
      var itemsArray = Object.keys(items)
      var isJungleItem = false;
      var isSupportItem = false;

      var bootsArray = []
      for (var prop in items) {
        if (items[prop].group === "BootsUpgrades") {
          bootsArray.push(items[prop])
        }
      }
      var randBootNumb = Math.floor(Math.random() * bootsArray.length)
      build.push(bootsArray[randBootNumb])
      while (build.length < 6) {
        var randNumb = Math.floor(Math.random() * itemsArray.length)
        var randItem = items[itemsArray[randNumb]]
        if (!!randItem.group) {
          if (randItem.group === "JungleItems" && isJungleItem === false) {
            isJungleItem = true;
            build.push(randItem)
          } if (randItem.group === "GoldBase" && isSupportItem === false) {
            isSupportItem = true;
            build.push(randItem)
          }
        } else {
          build.push(randItem)
        }
      }
      console.log(build)
    }
  }
} ());


 