'use strict';

describe('Controller: VersionCtrl', function () {

  // load the controller's module
  beforeEach(module('gns3WebApp'));

  var VersionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VersionCtrl = $controller('VersionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
