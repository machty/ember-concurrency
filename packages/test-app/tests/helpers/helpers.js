import { skip, test } from 'qunit';
import { dependencySatisfies, macroCondition } from '@embroider/macros';
import Ember from 'ember';
import {
  importSync,
  macroCondition,
  dependencySatisfies,
} from '@embroider/macros';

export const decoratorTest = macroCondition(
  dependencySatisfies('ember-source', '>=3.10.0')
) ? test : skip;

export function makeAsyncError(hooks) {
  hooks.afterEach(() => (Ember.onerror = null));
  return () => new window.Promise((r) => (Ember.onerror = r));
}

export function getDebugFunction(type) {
  if (macroCondition(dependencySatisfies('ember-source', '>3.26.0'))) {
    return importSync('@ember/debug').getDebugFunction(type);
  } else {
    return Ember[type];
  }
}

export function setDebugFunction(type, fn) {
  if (macroCondition(dependencySatisfies('ember-source', '>3.26.0'))) {
    return importSync('@ember/debug').setDebugFunction(type, fn);
  } else {
    Ember[type] = fn;
  }
}
