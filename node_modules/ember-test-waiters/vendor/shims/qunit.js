/* globals define, self */

(function() {
  function vendorModule() {
    'use strict';

    return {
      default: self.QUnit,
      module: self.QUnit.module,
      test: self.QUnit.test,
      todo: self.QUnit.todo,
      skip: self.QUnit.skip,
      __esModule: true,
    };
  }

  define('qunit', [], vendorModule);
})();
