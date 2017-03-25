(function() {
    angular.module('pms-app')
        .controller('AlertModalController', function($scope, $uibModalStack, title, rowObj) {
            $scope.rowObj = rowObj;
            $scope.title = title;

            $scope.onConfirm = function() {
                $uibModalStack.dismissAll('closing');
            };
        }); //end:AlertModalController
}()); //iife
