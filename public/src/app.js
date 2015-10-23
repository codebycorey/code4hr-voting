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
  //$scope.voted = 'none';
  $scope.voted = {};

  DataService.getData().then(function(data){
    $scope.candidates = data.candidates;
    $scope.candidates.forEach(function(element, index){
      element.index = index;
    });
  });

  $scope.changeVote = function(flag, iss) {
    names = iss.description;
    voted = "none";

    if (names in $scope.voted) {
      voted = $scope.voted[names];
    } else {
      if (flag == 'up') {
        $scope.voted[names] = 'up'; 
      } else {
        $scope.voted[names] = 'down';
      }
    }

    if (voted == 'none') {
      if (flag == 'up') {
        iss.up++;
      } else {
        iss.down++;
      }
      $scope.voted[names] = flag;
    } else {
      if (voted == 'up' && flag == 'up') {
        iss.up--;
        $scope.voted[names] = 'none';
      } else if (voted == 'up' && flag == 'down') {
        iss.up--;
        iss.down++;
        $scope.voted[names] = flag;
      } else if (voted == 'down' && flag == 'down') {
        iss.down--;
        $scope.voted[names] = 'none';
      } else if (voted == 'down' && flag == 'up') {
        iss.up++;
        iss.down--;
        $scope.voted[names] = flag;
      }
    }

  }

  $scope.newIssue = {};

  $scope.addNewIssue = function($event, index) {
    $scope.newIssue.up = 0;
    $scope.newIssue.down = 0;
    console.log($scope.candidates);
    console.log(index);
    $scope.candidates[index].issues.push($scope.newIssue);
    $scope.newIssue = {};
    $event.preventDefault();
  }
});
