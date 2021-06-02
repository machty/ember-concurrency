import { skip, test } from 'qunit';
import { gte } from 'ember-compatibility-helpers';
import Ember from 'ember';

export const decoratorTest = gte('3.10.0') ? test : skip;

export function makeAsyncError(hooks) {
  hooks.afterEach(() => (Ember.onerror = null));
  return () => new window.Promise((r) => (Ember.onerror = r));
}
