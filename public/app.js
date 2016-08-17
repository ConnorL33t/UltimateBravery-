; (function () {


    angular.module('ultimateBravery', ['ui.router'])

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
    }]);



    app.controller('appController', appController);

    appController.$inject = ['$state', 'LeagueService'];

    function appController($scope, $rootScope, $state, LeagueService) {

    }



} ());