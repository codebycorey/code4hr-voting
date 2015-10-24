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

app.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});

app.controller('MainController', function($scope, DataService) {
    $scope.gPlace;

    $scope.address = '';
    $scope.civicInfo = null;

    $scope.getCivicInfo = function() {
        DataService.getData($scope.address).then(function(data) {
            $scope.civicInfo = data;
            $scope.civicInfo.election.electionDOTW = moment($scope.civicInfo.election.electionDay).format('dddd');
            $scope.civicInfo.election.electionDay = moment($scope.civicInfo.election.electionDay).format('MMMM D, YYYY');
        });
    };

    $scope.mapLink = function(one, two, three, four) {

      var str = one + " " + two + " " + three;
      var ad = encodeURIComponent(str);

      var str2 = "https://www.google.com/maps/place/" + ad

      return str2.toLowerCase();        
    }

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
