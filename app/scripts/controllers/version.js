'use strict';

/**
 * @ngdoc function
 * @name gns3WebApp.controller:VersionCtrl
 * @description
 * # VersionCtrl
 * Controller of the gns3WebApp
 */
angular.module('gns3WebApp')
  .controller('VersionCtrl', function ($scope, $rootScope, Version, Restangular) {
        $scope.verion = '';

        $scope.getVersion = function() {
            Restangular.oneUrl('version', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/version/')
                .get('', {'Access-Control-Allow-Origin': 'true'}).then(function (response) {
                    return response
                }, function (error) {
                    return error;
                });
        };

        $scope.checkVersion = function(version){
            Restangular.oneUrl('version', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/version/')
                .post({'version':version}).then(function (response) {
                    return response
                }, function (error) {
                    return error;
                });
        }
  });
