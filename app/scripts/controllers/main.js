'use strict';

/**
 * @ngdoc function
 * @name gns3WebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gns3WebApp
 */
var app = angular.module('gns3WebApp');
app.controller('MainCtrl',function ($rootScope, $scope) {
        $scope.server = '';
        $scope.port = 0;

        $scope.setUrlAndPort = function(){
            $rootScope.server = $scope.server;
            $rootScope.port = $scope.port;

            console.log($rootScope.server);
            console.log($rootScope.port);
        };
  });
