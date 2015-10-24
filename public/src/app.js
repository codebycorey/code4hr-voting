var app = angular.module('LocalVotingApp', []);

app.factory('DataService', function($q, $http) {
    return {
        getData: function(address) {
            var defer = $q.defer();
            var addr = encodeURIComponent(address);
            $http.get('https://www.googleapis.com/civicinfo/v2/voterinfo?address=' + addr + '&key=AIzaSyB16sS2CG5ySFh--gRk0S8s90yDbJX_fJU', {
                    cache: 'true'
                })
                .success(function(data) {
                    defer.resolve(data);
                });

            return defer.promise;
        }
    };

});

app.controller('MainController', function($scope, DataService) {

    $scope.address = '';
    $scope.civicInfo = null;

    $scope.getCivicInfo = function() {
        DataService.getData($scope.address).then(function(data) {
            $scope.civicInfo = data;
        });
    };

    $scope.formatPhone = function(phonenum) {
        var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (regexObj.test(phonenum)) {
            var parts = phonenum.match(regexObj);
            var phone = "";
            if (parts[1]) {
                phone += "(" + parts[1] + ") ";
            }
            phone += parts[2] + "-" + parts[3];
            return phone;
        } else {
            //invalid phone number
            return phonenum;
        }
    }
});

/*
    $scope.address = '';

  //$scope.voted = 'none';
  $scope.voted = {};


  DataService.getData().then(function(data){
    $scope.candidates = data.candidates;
    $scope.candidates.forEach(function(element, index){
      element.index = index;
    });
  });

  $scope.changeVote = function(flag, iss, cName, ina) {
    names = cName + ina + iss.description;
    voted = "none";
    console.log(ina);

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
  */
