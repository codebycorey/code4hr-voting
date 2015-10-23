var app = angular.module('LocalVotingApp', [])
    app.controller('HomeController', function ($scope) {
        $scope.address = "test";
    });
    app.controller('AddressController', function ($scope) {
        $scope.address = "";
    });
