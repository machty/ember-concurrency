/* jshint node:true */

var defaultPrefix = 'v';

module.exports = {
  char: defaultPrefix,

  has: function(tag, prefix) {
    return tag[0] === (prefix || defaultPrefix);
  },

  strip: function(tag, prefix) {
    return tag.replace(new RegExp('^' + (prefix || defaultPrefix)), '');
  },

  prepend: function(tag, prefix) {
    return (prefix || defaultPrefix) + tag;
  }
};

