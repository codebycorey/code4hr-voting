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
            $scope.civicInfo.election.electionDOTW = moment($scope.civicInfo.election.electionDay).format('dddd');
            $scope.civicInfo.election.electionDay = moment($scope.civicInfo.election.electionDay).format('MMMM D, YYYY');
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
