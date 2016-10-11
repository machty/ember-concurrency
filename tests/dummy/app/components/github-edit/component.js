import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: 'github-edit',
  attributeBindings: ['href', 'title'],

  routing: Ember.inject.service('-routing'),
  href: Ember.computed('routing.currentPath', function() {
    let path = this.get('routing.currentPath').replace(/\./g, '/');
    return `https://github.com/machty/ember-concurrency/edit/master/tests/dummy/app/${path}/template.hbs`;
  }),
  title: "Edit on Github",
});

