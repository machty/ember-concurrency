export function asyncError() {
  return new window.Promise(r => Ember.onerror = r);
}
