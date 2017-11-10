import Ember from 'ember';

function taskHelper([task, ...args]) {
  return task._curry(...args);
}

export default Ember.Helper.helper(taskHelper);

