; (function () {

    let app = angular.module('ultimateBravery', ['ui-router'])

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

        }
    
}]);


}());