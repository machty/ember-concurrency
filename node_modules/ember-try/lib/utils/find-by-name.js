'use strict';

module.exports = function findByName(arr, name) {
  let matches = (arr || []).filter((item) => {
    if (item.name === name) {
      return item;
    }
  });
  return matches[0];
};
