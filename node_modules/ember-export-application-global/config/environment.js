'use strict';

module.exports = function(environment) {
  return {
    exportApplicationGlobal: environment !== 'production'
  };
};
