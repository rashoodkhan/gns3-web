'use strict';

describe('Controller: ConfigctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('gns3WebApp'));

  var ConfigctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfigctrlCtrl = $controller('ConfigctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
