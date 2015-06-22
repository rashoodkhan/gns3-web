'use strict';

/**
 * @ngdoc function
 * @name gns3WebApp.controller:ServerCtrl
 * @description
 * # ServerCtrl
 * Controller of the gns3WebApp
 */
angular.module('gns3WebApp')
  .controller('ServerCtrl', function ($scope, $rootScope, Restangular) {

        //Shutsdown the server
        var shutDownServer = function(){
            Restangular.oneUrl('shutdownServer', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/server/shutdown')
                .post(data).then(function (response) {
                    if (response.status == 201){
                        window.alert("The server has shutdown");
                        $rootScope.server = '';
                        $rootScope.port = 0;
                    }
                }, function (error) {
                    if (response.status == 403){
                        console.log("Server shutdown refuned");
                    }
                });
        };
  });
