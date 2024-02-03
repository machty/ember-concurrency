import Controller from '@ember/controller';
import config from '../config/environment';
import { inject as service } from '@ember/service';

const versionRegExp = /\d+[.]\d+[.]\d+(?:-(?:alpha|beta|rc)\.\d+)?/;
const {
  APP: { version },
} = config;

export default class ApplicationController extends Controller {
  addonVersion = version.match(versionRegExp)[0];

  @service notifications;
}
