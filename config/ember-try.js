/*jshint node:true*/
module.exports = {
  useVersionCompatibility: true,

  scenarios: [
    {
      name: 'ember-alpha',
      allowedToFail: true,
      bower: {
        'dependencies': {
          'ember': 'alpha'
        },
        resolutions: {
          'ember': 'alpha'
        }
      }
    }
  ]
};
