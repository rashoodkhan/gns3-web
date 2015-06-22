'use strict';

/**
 * @ngdoc overview
 * @name gns3WebApp
 * @description
 * # gns3WebApp
 *
 * Main module of the application.
 */
var app = angular
  .module('gns3WebApp', [
    'ngRoute',
    'restangular'
  ]);

app.config(function ($routeProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/version', {
        templateUrl: 'views/version.html',
        controller: 'VersionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      RestangularProvider.setBaseUrl('http://');
  });
