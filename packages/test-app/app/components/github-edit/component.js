import Component from '@ember/component';
import { computed } from '@ember/object';
import { service } from '@ember/service';

export default class extends Component {
  @service router;
  tagName = '';

  @computed('router.currentRouteName')
  get href() {
    let path = this.router.currentRouteName;
    if (!path) {
      // `routing` doesn't exist for old ember versions via ember-try
      return '#';
    }
    path = path.replace(/\./g, '/');
    return `https://github.com/machty/ember-concurrency/edit/master/packages/test-app/app/${path}/template.hbs`;
  }
}
