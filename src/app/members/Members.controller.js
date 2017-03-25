(function(){
  angular.module('pms-app')
  .controller('MembersController',MembersController);
  MembersController.$inject=['$scope','AlertModalService','MemberService'];
  function MembersController($scope,AlertModalService,MemberService){
    var vm = $scope;
    vm.doctorName="Welcome Dr. Jack Shepherd";
    var getAllMembersListService  = MemberService.getAllMembersList();
    getAllMembersListService.then(function(response){
      console.log('Response from JSON', response.data);
    })
    .catch(function(response){
      console.log('Error hitting the MemberService', response.data);
    });
  }//end:MembersController
}());//iife
