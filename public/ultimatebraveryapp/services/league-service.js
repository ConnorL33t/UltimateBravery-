; (function () {
  angular.module('ultimateBravery')
    .service('LeagueService', LeagueService)

  LeagueService.$inject = ['$http'];

  function LeagueService($http) {
    var ls = this;
    var MasterLeagueList = [];
    var MasterItemList = [];

    function saveMasterLeagueList(champs) {
      localStorage.setItem('champs', JSON.stringify(champs))
    }

    function saveMasterItemList(items) {
      localStorage.setItem('items', JSON.stringify(items))
    }

    function saveMasteriesList(masteries) {
    localStorage.setItem('masteries', JSON.stringify(masteries))
    }

    this.getLeagueList = function (cb) {
      $http({
        method: 'GET',
        url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
      }).then(function successCallback(response) {
        var champs = response.data.data;
        for (var champ in champs) {

          champs[champ].img = `/image/lolimages/img/champion/${champ}.png`
          champs[champ].spells = [
            `/image/lolimages/img/spell/${champ}Q.png`,
            `/image/lolimages/img/spell/${champ}W.png`,
            `/image/lolimages/img/spell/${champ}E.png`
          ]
          if (champ === `Udyr`) {
            champs[champ].spells = [
              `/image/lolimages/img/spell/${champ}Q.png`,
              `/image/lolimages/img/spell/${champ}W.png`,
              `/image/lolimages/img/spell/${champ}E.png`,
              `/image/lolimages/img/spell/${champ}R.png`
            ]
          }
        }

        saveMasterLeagueList(champs)
        cb(champs)
        console.log(champs)

      });
    }

    function mirrorProps(obj, props){
      props.forEach(p=>{
        obj[p] = p;
      })
    }
    
    let desiredSummonerSpells = {
    }

    mirrorProps(desiredSummonerSpells,[
      "SummonerBarrier",
      "SummonerBoost",
      "SummonerDot",
      "SummonerExhaust",
      "SummonerFlash",
      "SummonerHaste",
      "SummonerHeal",
      "SummonerSmite",
      "SummonerTeleport"
    ])

    let desiredMastery = {
    }

    mirrorProps(desiredMastery,[
      6161,
      6162,
      6164,
      6261,
      6262,
      6263,
      6361,
      6362,
      6363
    ])

    let desiredItems = {
    }

    mirrorProps(desiredItems,[
      1400,
      1401,
      1402,
      1408,
      1409,
      1410,
      1412,
      1413,
      1414,
      1416,
      1418,
      1419,
      2301,
      2302,
      2303,
      3001,
      3003,
      3004,
      3006,
      3009,
      3020,
      3022,
      3025,
      3026,
      3027,
      3030,
      3031,
      3033,
      3036,
      3041,
      3046,
      3047,
      3050,
      3053,
      3056,
      3060,
      3065,
      3068,
      3069,
      3071,
      3072,
      3074,
      3075,
      3078,
      3083,
      3085,
      3087,
      3089,
      3091,
      3092,
      3094,
      3100,
      3102,
      3110,
      3111,
      3115,
      3116,
      3117,
      3124,
      3135,
      3139,
      3142,
      3143,
      3146,
      3147,
      3151,
      3152,
      3153,
      3156,
      3157,
      3158,
      3174,
      3190,
      3222,
      3285,
      3401,
      3508,
      3512,
      3742,
      3800,
      3812
    ])
    
    this.getItems = function (cb) {
      $http({
        method: 'GET',
        url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
      }).then(function (response) {
        var items = response.data.data;
        for (var item in items) {  
          if(desiredItems[item]){
            items[item].img = `/image/lolimages/img/item/${item}.png` 
          }else{
            delete items[item]
          }
        }
        saveMasterItemList(items)
        cb(items)
        
      });
    }

    this.getKeystone = function (cb) {
      $http({
        method: 'GET',
        url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/mastery?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
      }).then(function (response) {
        var masteries = response.data.data;

        for (var desiredKS in masteries) {
          
          if(desiredMastery[desiredKS]){
            masteries[desiredKS].img = `/image/lolimages/img/mastery/${desiredKS}.png` 
          }else{
            delete masteries[desiredKS]
          }
          
        }
        saveMasteriesList(masteries)

        cb(masteries)
      });
    }

     this.getSumSpells = function (cb) {
      $http({
        method: 'GET',
        url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/summoner-spell?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
      }).then(function (response) {
        var summonerSpells = response.data.data;
        for (var desiredSS in summonerSpells) {
          
          if(desiredSummonerSpells[desiredSS]){
            summonerSpells[desiredSS].img = `/image/lolimages/img/summoner-spells/${desiredSS}.png` 
          }else{
            delete summonerSpells[desiredSS]
          }
          
        }
        saveMasteriesList(summonerSpells)
        cb(summonerSpells)
        // console.log(summonerSpells)
      });
    }
  }
} ());