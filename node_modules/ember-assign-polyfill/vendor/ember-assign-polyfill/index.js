/* globals Ember, require*/

(function() {
  var _Ember;

  if (typeof Ember !== 'undefined') {
    _Ember = Ember;
  } else {
    _Ember = require('ember').default;
  }

  if (!_Ember.assign) {
    _Ember.assign = function() {
      var objects = new Array(arguments.length);
      for (var i = 0; i < arguments.length; i++) {
        objects[i] = arguments[i];
      }

      return objects.reduce(Ember.merge);
    };
  }
})();
