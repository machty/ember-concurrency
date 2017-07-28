import { assert } from '@ember/debug';
import TaskInstance from './-task-instance';

export default TaskInstance.extend({
  _makeIterator() {
    let perform = this.get('perform');
    assert("The object passed to `task()` must define a `perform` generator function, e.g. `perform: function * (a,b,c) {...}`, or better yet `*perform(a,b,c) {...}`", typeof perform === 'function');
    return perform.apply(this, this.args);
  },

  perform: null,
});

