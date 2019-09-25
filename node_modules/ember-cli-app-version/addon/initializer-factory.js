import Ember from 'ember';
import { classify } from '@ember/string';

const {
  libraries
} = Ember;

export default function initializerFactory(name, version) {
  let registered = false;

  return function() {
    if (!registered && name && version) {
      let appName = classify(name);
      libraries.register(appName, version);
      registered = true;
    }
  };
}
