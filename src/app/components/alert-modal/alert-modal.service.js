(function() {
    angular.module('pms-app')
        .factory('AlertModalService', function($uibModal) {
            var service = {};
            service.confirm = function(title, message) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: 'sm',
                    templateUrl: 'app/components/alert-modal/alert-modal.html',
                    controller: 'AlertModalController',
                    resolve: {
                        title: function() {
                            return title;
                        },
                        message: function() {
                            return message;
                        }
                    }
                });
                return modalInstance.result;
            };
            return service;
        }); //end:AlertModalService

}()); //iife
