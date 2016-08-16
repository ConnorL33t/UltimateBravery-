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



       
        this.getLeagueList = function(cb){
            $http({
                method: 'GET',
                url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
            }).then(function successCallback(response) {
                var champs = response.data.data;             
                for(var champ in champs){

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

        this.getItems = function (cb) {
            $http({
                method: 'GET',
                url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
            }).then(function (response) {
                var items = response.data.data;
                for (var item in items) {
                    items[item].img = `/image/lolimages/img/item/${item}.png`
                }
                saveMasterItemList(items)
                cb(items)
                console.log(items)

            }, function (response) {

            });
        }
                }
} ());