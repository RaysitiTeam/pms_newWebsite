(function() {
    angular.module('pms-app')
        .controller('AlertModalController', function($scope, $uibModalStack, title, rowObj) {
            $scope.rowObj = rowObj;
            $scope.title = title;
            $scope.isEditField = false;
            $scope.onConfirm = function() {
                $uibModalStack.dismissAll('closing');
            };

            $scope.showEditField = function(value){
              $scope.isEditField = value;
            };//end:showEditField
        }); //end:AlertModalController
}()); //iife
