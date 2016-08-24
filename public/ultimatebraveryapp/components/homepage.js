; (function () {



    angular.module('ultimateBravery')
        .component('uBComponent', {
            templateUrl: 'ultimatebraveryapp/templates/homepage.html',
            controller: UBController


        })



    UBController.$inject = ['$state', 'LeagueService', 'SummonerService']

        // Used for our background video on first state

        // TODO:: Might be able to be use just an iframe instead of using a full Jquery plugin

    function UBController($state, LeagueService, SummonerService) {
        let ubc = this
        ubc.$onInit = function () {
            if ($('iframe').length > 0) {
                return $('iframe').show();
            }


            $('#ytpPlayer').append(`<div id="ppp" class="player"></div>`).after(function () {

                // This array can hold multiple videos for the front page, any youtube video can be used
                var videos = [
                    { videoURL: 'https://youtu.be/lu0fUb0PGh4', containment: 'body', autoPlay: true, showYTLogo: false, mute: true, startAt: 0, opacity: .6, showControls: false, optimizeDisplay: true, realfullscreen: true, quality: 'hd1080', addRaster: false, gaTrack: false }
                ];
                ubc.ytpElem = $("#ppp").YTPlaylist(videos, true, function (a) {

                });
            })
        }

        ubc.$onDestroy = function () {
            // Work around to make the video stop on other states
            $('iframe').hide();
        }

        ubc.showSummonerProfile = function (summoner) {

             return $state.go('landingpage', { summoner: summoner })


        }






    }



} ());
