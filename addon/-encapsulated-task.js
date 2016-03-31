import Ember from 'ember';
import TaskInstance from './-task-instance';

export default TaskInstance.extend({
  _makeIterator() {
    let perform = this.get('perform');
    Ember.assert("The object passed to `task()` must define a `perform` generator function, e.g. `perform: function * () {...}`", typeof perform === 'function');
    return perform.apply(this, this.args);
  },

  perform: null,
});

