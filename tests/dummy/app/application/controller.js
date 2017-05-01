import Ember from 'ember';
import config from '../config/environment';

const versionRegExp = /\d[.]\d[.]\d/;
const {
  APP: { version }
} = config;

export default Ember.Controller.extend({
  addonVersion: version.match(versionRegExp)[0]
});
