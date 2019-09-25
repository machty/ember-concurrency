(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['sinon'] };
  }

  define('sinon', [], vendorModule);
})();
