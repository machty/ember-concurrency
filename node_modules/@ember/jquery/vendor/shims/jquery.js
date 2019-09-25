(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['jQuery'],
      __esModule: true,
    };
  }

  define('jquery', [], vendorModule);
})();
