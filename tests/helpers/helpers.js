import Ember from 'ember';

export function makeAsyncError(hooks) {
  hooks.afterEach(() => Ember.onerror = null);
  return () => new window.Promise(r => Ember.onerror = r);
}
