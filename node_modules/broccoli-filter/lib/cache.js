module.exports = Cache;

function Cache() {
  this.store = Object.create(null);
}

Cache.prototype.get = function(key) {
  return this.store[key];
};

Cache.prototype.set = function(key, value) {
  return this.store[key] = value;
};

Cache.prototype.delete = function(key) {
  delete this.store[key];
};

Cache.prototype.keys = function() {
  return Object.keys(this.store);
};

Cache.prototype.keysWithout = function(without) {
  return this.keys().filter(function(key) {
      return without.indexOf(key) === -1;
  });
};

Cache.prototype.deleteExcept = function(without) {
  return this.keysWithout(without).map(function(key) {
    this.delete(key);
    return key;
  }, this);
};
