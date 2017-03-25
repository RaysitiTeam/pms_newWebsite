(function() {
    angular.module('pms-app')
        .controller('AlertModalController', function($scope, $uibModalStack, title, message) {
            $scope.message = message;
            $scope.title = title;

            $scope.onConfirm = function() {
                $uibModalStack.dismissAll('closing');
            };
        }); //end:AlertModalController
}()); //iife
