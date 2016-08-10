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
                url: '/summonerpage',
                component: 'lPComponent'
            })


        app.controller('appController', appController);

        appController.$inject = ['LeagueService'];

        function appController(LeagueService) {
            let ac = this;

        }
    
}]);



}());