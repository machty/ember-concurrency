import Ember from 'ember';
import { objectAssign } from 'ember-concurrency/utils';

let { computed } = Ember;
let { alias } = computed;

function reverse(s) {
  var o = '';
  for (var i = s.length - 1; i >= 0; i--) {
    o += s[i];
  }
  return o;
}

// BEGIN-SNIPPET modal-fun-controller
import { task, timeout, taskGroup } from 'ember-concurrency';

let PAUSE_FOREVER = Ember.RSVP.defer().promise;

export default Ember.Controller.extend({
  openWizard: task({
    perform: function * () {
      this.get('stepOne').perform();
      yield PAUSE_FOREVER;
    },

    states: taskGroup().restartable(),
    currentState: alias('states.last'),

    next: taskByName('next'),
    prev: taskByName('prev'),

    stepOne: state({
      title: "Step 1",
      next: 'stepTwo',
      index: 0,
    }),

    stepTwo: state({
      perform: function * () {
        while (true) {
          yield timeout(500);
          this.set('title', reverse(this.title));
        }
      },

      title: "Step 2",
      prev: 'stepOne',
      next: 'stepThree',
      index: 1,
    }),

    stepThree: state({
      title: "Step 3",
      prev: 'stepTwo',
      index: 2,
    }),
  }),
});

function state(attrs) {
  let defaultAttrs = {
    perform: function * () {
      yield PAUSE_FOREVER;
    }
  };
  objectAssign(defaultAttrs, attrs);
  return task(defaultAttrs).group('states');
}

function taskByName(key) {
  let currentKey = `currentState.${key}`;
  return computed(currentKey, function() {
    let name = this.get(currentKey);
    if (!name) { return null; }
    return this.get(name);
  });
}

// END-SNIPPET

