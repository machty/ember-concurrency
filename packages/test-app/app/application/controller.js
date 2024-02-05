import Controller from '@ember/controller';
import config from '../config/environment';
import { inject as service } from '@ember/service';

const versionRegExp = /\d+[.]\d+[.]\d+(?:-(?:alpha|beta|rc)\.\d+)?/;
const { emberConcurrencyVersion } = config;

export default class ApplicationController extends Controller {
  addonVersion = emberConcurrencyVersion.match(versionRegExp)[0];

  @service notifications;
}
