/* jshint node:true */

module.exports = function findBy(array, key, value) {
  for (var i = 0, l = array.length; i < l; i++) {
    if (array[i] && array[i][key] === value) {
      return array[i];
    }
  }
};
