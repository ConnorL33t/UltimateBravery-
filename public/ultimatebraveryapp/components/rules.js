;(function(){

    angular.module('ultimateBravery')
        .component('rulesComponent', {
            templateUrl: 'ultimatebraveryapp/templates/rules.html',
            controller: rulesController
        })



        rulesController.$inject = ['$state', 'LeagueService']




        function rulesController($state, LeagueService){
            let rules = this;



        }
}());