(function() {
    angular.module('pms-app')
        .factory('AlertModalService', function($uibModal) {
            var service = {};
            service.confirm = function(title, rowObj) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    size: 'md',
                    templateUrl: 'src/app/components/alert-modal/alert-modal.html',
                    controller: 'AlertModalController',
                    resolve: {
                        title: function() {
                            return title;
                        },
                        rowObj: function() {
                            return rowObj;
                        }
                    }
                });
                return modalInstance.result;
            };
            return service;
        }); //end:AlertModalService

}()); //iife
