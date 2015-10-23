var app = angular.module('LocalVotingApp', []);

app.factory('DataService', function($q, $http) {
  return {
      getData: function() {
          var defer = $q.defer();
          $http.get('./src/mockData/candidates.json', { cache: 'true'})
          .success(function(data) {
              defer.resolve(data);
          });

          return defer.promise;
      }
  }

});

app.controller('MainController', function($scope, DataService) {
  DataService.getData().then(function(data){
    $scope.candidates = data.candidates;
    console.log(data.candidates);
  });

  $scope.newIssue = {
    description: "",
    up: 0,
    down: 0
  };

  $scope.addNewIssue = function($event){
    console.log($scope.newIssue);
    return false;
  }
});
