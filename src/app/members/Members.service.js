(function(){
  angular.module('pms-app')
  .service('MemberService',MemberService);
  MemberService.$inject=['$http'];
  
  /** @ngInject */
  function MemberService($http){
    return{
      getAllMembersList:getAllMembersList
    };
    function getAllMembersList(){
      var promise = $http.get('data/json/members_list.json')
      .success(function(data,status,headers,config){
        return data;
      })
      .error(function(data,status,headers,config){
        return data;
      });
      return promise;
    }//end:getAllMembersList
  }//end:MemberService
}());//iife
