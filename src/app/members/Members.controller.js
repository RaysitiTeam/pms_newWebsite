(function(){
  angular.module('pms-app')
  .controller('MembersController',MembersController);
  MembersController.$inject=['$scope','AlertModalService','MemberService'];
  function MembersController($scope,AlertModalService,MemberService){
    var vm = $scope;
    vm.smartTablePageSize = 5;
    vm.doctorName="Welcome Dr. Jack Shepherd";
    var getAllMembersListService  = MemberService.getAllMembersList();
    getAllMembersListService.then(function(response){
      console.log('Response from JSON', response.data);
      vm.smartTableDataList = response.data;
    })
    .catch(function(response){
      console.log('Error hitting the MemberService', response.data);
    });
    vm.viewDetails = function(rowObj){
      console.log('Row Selected is: ',rowObj);
      AlertModalService.confirm('Member Details', rowObj);
    };//end:viewDetails
  }//end:MembersController
}());//iife
