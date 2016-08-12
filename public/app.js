;(function(){


    angular.module('ultimateBravery', ['ui.router'])


        let app = angular.module('ultimateBravery')

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
            .state('rules',{
                url: '/rules',
                component: 'rulesComponent'
            })



        app.controller('appController', appController);

        appController.$inject = ['$state','LeagueService'];

        function appController($state, LeagueService) {
            let ac = this;

        }
    
}]);



}());