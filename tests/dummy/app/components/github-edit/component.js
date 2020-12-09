import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'a',
  classNames: 'github-edit',
  attributeBindings: ['href', 'title'],

  router: service(),
  href: computed('router.currentRouteName', function() {
    let path = this.get('router.currentRouteName');
    if (!path) {
      // `routing` doesn't exist for old ember versions via ember-try
      return;
    }
    path = path.replace(/\./g, '/');
    return `https://github.com/machty/ember-concurrency/edit/master/tests/dummy/app/${path}/template.hbs`;
  }),
  title: "Edit on Github",
});
