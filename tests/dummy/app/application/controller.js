import Controller from '@ember/controller';
import config from '../config/environment';

const versionRegExp = /\d+[.]\d+[.]\d+/;
const {
  APP: { version }
} = config;

export default class ApplicationController extends Controller {
  addonVersion = version.match(versionRegExp)[0];
}
