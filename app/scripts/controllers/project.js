'use strict';

/**
 * @ngdoc function
 * @name gns3WebApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the gns3WebApp
 */
angular.module('gns3WebApp')
  .controller('ProjectCtrl', function ($scope, $rootScope, Restangular) {

        //Model for Project
        $scope.project = {};

        //Creating a new Project
        var createProject = function(name,temporary){
            var data = {name:name,temporary:temporary};

            Restangular.oneUrl('createProject', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/')
                .post(data).then(function (response) {
                    //Updates the Project Model
                    $scope.project.path = response.path;
                    $scope.project.name = response.name;
                    $scope.projectlocation = response.location;
                    $scope.project.project_id = response.project_id;
                    $scope.project.temporary = response.temporary;
                }, function (error) {
                    console.log(error);
                });
        };

        //Get a project using its project ID
        var getProject = function(project_id){
            Restangular.oneUrl('getProject', 'http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+project_id)
                .get().then(function (response) {
                    //Updates the Project Model
                    $scope.project.path = response.path;
                    $scope.project.name = response.name;
                    $scope.projectlocation = response.location;
                    $scope.project.project_id = response.project_id;
                    $scope.project.temporary = response.temporary;
                }, function (error) {
                    console.log(error);
                });
        };

        //Update existing project
        var updateProject = function(project_id,project){
            var data = {};
            if (project.name) {
                data.name = project.name;
            }else if (project.path) {
                data.path = project.path;
            }
            Restangular.oneUrl('http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+project_id)
                .put(data).then(function(response){
                    $scope.name = respone.name;
                    $scope.path = response.path;
                    $scope.project_id = response.project_id;
                }, function(error){
                    console.log(error);
                });
        }

        //Delete existing project using the project_id
        var deleteProject = function(project_id){
            Restangular.oneUrl('deleteProject','http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+project_id)
                .remove().then(function(repsonse){
                    if (response.status == 204)
                        window.alert("The project has been deleted successfully");
                    else
                        window.alert("Some error has occured while deleting the project");
                    $scope.project = {};
                }, function(error){
                    if(error.status = 404)
                        window.alert("Project does not exist");
                    else
                        window.alert("Project could not be deleted - "+error);
                });
        }

        //Close the existing project
        var closeProject = function(project_id){
            Restangular.oneUrl('closeProject','http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+project_id+'/close')
                .post().then(function(response){
                    if (response.status == 204) {
                        console.log("The project has been closed");
                        $scope.project = {};
                    }

                }, function(error){
                    if (response.status == 404) {
                        console.log("The project does not exists");
                    }
            });
        }

        //Commit changes to the project
        var commitProject = function(project_id){
            Restangular.oneUrl('commitProject','http://' + $rootScope.server + ':' + $rootScope.port + '/v1/projects/'+project_id+'/commit')
                .post().then(function(response){
                    if (response.status == 204) {
                        console.log("The project has been committed");
                    }

                }, function(error){
                    if (response.status == 404) {
                        console.log("The project does not exists");
                    }
                });
        }

  });
