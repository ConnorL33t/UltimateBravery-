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
      'SummonerBarrier',
      'SummonerBoost',
      'SummonerDot',
      'SummonerExhaust',
      'SummonerFlash',
      'SummonerHaste',
      'SummonerHeal',
      'SummonerSmite',
      'SummonerTeleport'
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
        var jungleItems = [];
        var supportItems = [];
        var boots = [];
        var otherItems = [];
        for (var item in items) {
          
          if(desiredItems[item]){
            items[item].img = `/image/lolimages/img/item/${item}.png` 
          if(desiredItems[item] === 1400 || desiredItems[item] === 1401 || desiredItems[item] === 1402 || desiredItems[item] === 1408 || desiredItems[item] === 1409 || desiredItems[item] === 1410 || desiredItems[item] === 1412 || desiredItems[item] === 1413 || desiredItems[item] === 1414 || desiredItems[item] === 1416 || desiredItems[item] === 1418 || desiredItems[item] === 1419){
            Object.keys(desiredItems[item])
            jungleItems.push(desiredItems[item])
          }
          if(desiredItems[item] === 2301 || desiredItems[item] === 2302 || desiredItems[item] === 2303 ||  desiredItems[item] === 3069 || desiredItems[item] === 3092 || desiredItems[item] === 3401){
            Object.keys(desiredItems[item])
            supportItems.push(desiredItems[item])
          }
          if(desiredItems[item] == 3158 || desiredItems[item] === 3117 || desiredItems[item] === 3111 || desiredItems[item] === 3047 || desiredItems[item] === 3020 || desiredItems[item] === 3009 || desiredItems[item] === 3006){
            Object.keys(desiredItems[item])
            boots.push(desiredItems[item])
          }
        
          }else{
            delete items[item]
          }
        }
        saveMasterItemList(items)
        cb(items)
        console.log(items)
        console.log('Jungle Items: ',jungleItems)
        console.log('Support items: ', supportItems)
        console.log('boots: ', boots)
        
      });
    }

    this.getKeystone = function (cb) {
      $http({
        method: 'GET',
        url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/mastery?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
      }).then(function (response) {
        var masteries = response.data.data;
        for (var keystone in masteries) {
          
          if(desiredMastery[keystone]){
            masteries[keystone].img = `/image/lolimages/img/mastery/${keystone}.png` 
          }else{
            delete masteries[keystone]
          }
          
        }
        saveMasteriesList(masteries)
        cb(masteries)
        console.log(masteries)
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
        console.log(summonerSpells)
      });
    }
  }
} ());