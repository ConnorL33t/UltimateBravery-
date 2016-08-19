;(function(){

    angular.module('ultimateBravery')
        .component('qRComponent', {
            templateUrl: 'ultimatebraveryapp/templates/queue.html',
            controller: QRController
        })



        QRController.$inject = ['$state', 'SocketService']




        function QRController($state, SocketService){
            var qr = this;
            var socket = SocketService.getSocket();

            qr.client = SocketService.getClient();


        }
}());