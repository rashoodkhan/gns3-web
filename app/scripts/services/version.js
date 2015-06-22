'use strict';

/**
 * @ngdoc service
 * @name gns3WebApp.Version
 * @description
 * # Version
 * Service in the gns3WebApp.
 */
angular.module('gns3WebApp')
  .service('Version', function (Restangular,$rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
        return {
            getVerion: function(){
                var server = $rootScope.server;
                var port = $rootScope.port;
                Restangular.one(server+':'+port+'/v1/version').get().then(function(response){
                    return response;
                }, function(error){
                    return error;
                });
            },

            checkVersion : function(version){
                var server = $rootScope.server;
                var port = $rootScope.port;

                Restangular.one(server+':'+port+'/v1/version').post({version:version}).then(function(response){
                    return response;
                }, function(error){
                    return error;
                });
            }
        };
  });
