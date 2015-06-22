'use strict';

/**
 * @ngdoc function
 * @name gns3WebApp.controller:DynamipsCtrl
 * @description
 * # DynamipsCtrl
 * Controller of the gns3WebApp
 */
angular.module('gns3WebApp')
  .controller('DynamipsCtrl', function ($scope) {

        //Model for Dynamips
        $scope.dynamips = {};

        //Create a dynamips image
        var createDynamips = function(device_type,name){
            var data = {device_type: device_type, name:name};

            Restangular.oneUrl('createDynamips', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+$scope.project.project_id+'/dynamips/devices')
                .post(data).then(function (response) {
                    if (response.status == 209){
                        $scope.dynamips.device_id = response.device_id;
                        $scope.dynamips.device_type = response.device_type;
                        $scope.dynamips.mappings = response.mappings;
                        $scope.dynamips.name = response.name;
                        $scope.dynamips.ports = response.ports;
                        $scope.dynamips.project_id = response.project_id;
                    }
                }, function (error) {
                    if (response.status == 409){
                        console.log("Conflict has occured");
                    }
                    else if (response.status == 400){
                        console.log("Invalid request has been sent. Please check!");
                    }
                });
        };

        //Get Dynamips
        var getDynamips = function(project_id, device_id){
            Restangular.oneUrl('getDynamips', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+project_id+'/dynamips/devices/'+device_id)
                .get().then(function (response) {
                    if (response.status == 200){
                        $scope.dynamips.device_id = response.device_id;
                        $scope.dynamips.device_type = response.device_type;
                        $scope.dynamips.mappings = response.mappings;
                        $scope.dynamips.name = response.name;
                        $scope.dynamips.ports = response.ports;
                        $scope.dynamips.project_id = response.project_id;
                    }
                }, function (error) {
                    if (response.status == 404){
                        console.log("Object does not exist");
                    }
                    else if (response.status == 400){
                        console.log("Invalid request has been sent. Please check!");
                    }
                });
        };

        //Updates the dynamips
        var updateDynamips = function(project_id, device_id, port, type, vlan, name, ports){
            var data = {
                port: port,
                type: type,
                vlan: vlan,
                name: name,
                ports:ports
            }

            Restangular.oneUrl('updateDynamips', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+project_id+'/dynamips/devices/'+device_id)
                .put(data).then(function (response) {
                    if (response.status == 200){
                        console.log("The dynamips has been updated");
                    }
                }, function (error) {
                    if (response.status == 404){
                        console.log("Object does not exist");
                    }
                    else if (response.status == 400){
                        console.log("Invalid request has been sent. Please check!");
                    }
                    else if (response.status == 409){
                        console.log("Conflict has occured");
                    }
                });
        };

        //Deletes the Dynamips
        var removeDynamips = function(project_id, device_id){
            Restangular.oneUrl('removeDynamips', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+project_id+'/dynamips/devices/'+device_id)
                .remove().then(function (response) {
                    if (response.status == 204){
                        console.log("The dynamips has been deleted");
                        $scope.dynamips = {};
                    }
                }, function (error) {
                    if (response.status == 404){
                        console.log("Object does not exist");
                    }
                    else if (response.status == 400){
                        console.log("Invalid request has been sent. Please check!");
                    }
                });
        }
  });
