; (function () {
    angular.module('ultimateBravery')
        .component('lPComponent', {
            templateUrl: 'ultimatebraveryapp/templates/landingpage.html',
            controller: LPController
        })
    LPController.$inject = ['$state', 'LeagueService', 'SummonerService', 'SocketService', '$timeout'];
    function LPController($state, LeagueService, SummonerService, SocketService, $timeout) {
        var $ctrl = this;
        var socket;
        $ctrl.user = {
            summoner: $state.params.summoner,
            champs: {
            }
        }
        $ctrl.$onInit = function () {
            SummonerService.getSummonersChamps($state.params.summoner, function (champMastery) {
                // console.log(champMastery)
            })



                    // Returns user to homepage if not a real summoner profileicon

            SummonerService.getSummonerProfile($state.params.summoner, function (summoner) {
                // console.log(summoner)
                if (summoner.status) {
                    return $state.go('login');
                    // TODO: Make this not even let the person past the first page if not a real summoner
                }
                var cleanSummonerName = $state.params.summoner.split(' ').join('').trim().toLowerCase()
                $ctrl.user.summoner = summoner[cleanSummonerName] ? summoner[cleanSummonerName].name : $state.params.summoner;
                $ctrl.user.profileIcon = `/image/lolimages/img/profileicon/${summoner[cleanSummonerName].profileIconId}.png`
                socket = SocketService.connect(summoner);

                $ctrl.client = SocketService.getClient();
            })
            $ctrl.rules = function () {
                $state.go('rules')
            }
            $ctrl.toggleChamp = function (champ) {
                if ($ctrl.user.champs[champ.name] && $ctrl.user.champs[champ.name].owned) {
                    $ctrl.user.champs[champ.name].owned = false;
                } else {
                    $ctrl.user.champs[champ.name] = { owned: true };
                }
            }
            $ctrl.quickmatch = function () {

                $state.go('quickmatch')

            }
            $ctrl.findMatchGame = function (champ, index, masteries,summonerSpells) {
                SummonerService.getRandChampion($ctrl.user);
                SummonerService.getRandItems()
                SummonerService.getRandMastery($ctrl.masteries)
                SummonerService.getRandSumms($ctrl.summonerSpells)
                SocketService.joinRoom('queue')
                $state.go('queue')

            }
            $ctrl.champBtn = "Select All Champions"
            var on = false
            $ctrl.toggleAllChamps = function () {
                on = !on
                if (on != true) {
                    $ctrl.champBtn = "Select All Champions"
                } else {
                    $ctrl.champBtn = "Unselect All Champions"
                }
                for (var ch in $ctrl.champArray) {
                    var champ = $ctrl.champArray[ch]
                    $ctrl.user.champs[champ.name] = {
                        owned: on
                    }
                }
            }
            $ctrl.champArray = [];
            LeagueService.getLeagueList(function (champs) {
                $ctrl.champs = champs;
                Object.keys(champs).sort().forEach(function (x, i) {
                    $ctrl.champArray.push(champs[x])
                })
            })

            LeagueService.getItems(function (items) {
                $ctrl.items = items;
            })
            LeagueService.getKeystone(function (masteries) {
                $ctrl.masteries = masteries;
            })
            LeagueService.getSumSpells(function (summonerSpells) {
                $ctrl.summonerSpells = summonerSpells;
            })
        }
    }
} ());