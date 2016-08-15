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
            ss.summoner = summoner
            $http.get('/summoner/' + summoner).then(function (response) {
                var summonerObject = response.data;
                console.log(summonerObject)
                ss.getSummChamps(ss.summoner, summonerObject)
                return cb(summonerObject)
                // return masterLeagueList()
            }, function (response) {

            });
            // for(var summoner in summonerObject){
            //     debugger
            //     summoner[summonerObject].profileicon = `/image/lolimages/img/profileicon/${summoner}.png`
            // }

            ss.getSummChamps = function (summoner, summonerObject) {
                var id = summonerObject[summoner].id
                var baseUrl = 'https://na.api.pvp.net/championmastery/location/NA1/player/'
                var endUrl = '/champions?api_key=RGAPI-689BE4DC-5FF5-4088-B688-808979F36E57'
                var url = baseUrl + id + endUrl
                $http.get(url).then(function(response){
                    var summonerchamps = response.data
                    console.log(response.data)
                })

            }

        }
    }
} ());


// '{{$ctrl.user.summoner}}'