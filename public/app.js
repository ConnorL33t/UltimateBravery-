; (function () {


    angular.module('ultimateBravery', ['ui.router'])

    var app = angular.module('ultimateBravery')

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                component: 'uBComponent'
            })
            .state('landingpage', {
                url: '/summonerpage/:summoner',
                component: 'lPComponent'
            })
            .state('queue', {
                url: '/queue',
                component: 'qRComponent'
            })
            .state('match', {
                url: '/gamematch',
                component: 'gMComponent'
            })
            .state('rules', {
                url: '/rules',
                component: 'rulesComponent'
            })
            .state('quickmatch', {
                url: '/soloplay',
                component: 'qMComponent'
            })
            .state('sockets', {
                url: '/sockets',
                component: 'sockets'
            })
    }]);



    app.controller('appController', appController);

    appController.$inject = ['SocketService'];

    function appController(SocketService) {
        let socket = SocketService.getSocket();
    }



} ());