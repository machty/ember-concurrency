'use strict';

module.exports = {
  initializeEmberENV(templateCompiler, EmberENV) {
    if (!templateCompiler || !EmberENV) { return; }

    let props;

    if (EmberENV.FEATURES) {
      props = Object.keys(EmberENV.FEATURES);

      props.forEach(prop => {
        templateCompiler._Ember.FEATURES[prop] = EmberENV.FEATURES[prop];
      });
    }

    if (EmberENV) {
      props = Object.keys(EmberENV);

      props.forEach(prop => {
        if (prop === 'FEATURES') { return; }

        templateCompiler._Ember.ENV[prop] = EmberENV[prop];
      });
    }
  },

  template(templateCompiler, string, options) {
    let precompiled = templateCompiler.precompile(string, options);
    return 'Ember.HTMLBars.template(' + precompiled + ')';
  }
};
