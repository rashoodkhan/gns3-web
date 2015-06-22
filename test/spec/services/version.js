'use strict';

describe('Service: Version', function () {

  // load the service's module
  beforeEach(module('gns3WebApp'));

  // instantiate service
  var Version;
  beforeEach(inject(function (_Version_) {
    Version = _Version_;
  }));

  it('should do something', function () {
    expect(!!Version).toBe(true);
  });

});
