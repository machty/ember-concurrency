import Ember from 'ember';
import { csp, DidNotRunException } from 'ember-concurrency';
import { Process } from 'ember-concurrency';

function didNotRun() {
  return Ember.RSVP.resolve(new DidNotRunException());
}

export default Ember.Service.extend({
  _taskDestroyed(task) {
    this._taskDidFinish(task);
    // TODO: cancel depended-upon tasks? tests?
  },

  _taskDidFinish(task) {
    this._incrementSemaphoresForTaskChain(task, -1);
  },

  _incrementSemaphoresForTaskChain(_task, inc) {
    let task = _task;
    while (task) {
      task.incrementProperty('_isRunningSem', inc);
      task = task._depTask;
    }
  },

  _tryPerform(task, args) {
    let currentlyExecutingTask = Ember.get(csp.Process, '_current._emberProcess._task');

    if (!task.get('isPerformable')) {
      if (currentlyExecutingTask) {
        if (currentlyExecutingTask._depTask !== task) {
          // this task is unperformable and is not a dependency
          // of the currently running task, so we error.
          return didNotRun();
        } else {
          // this task is unperformable, but that is because
          // the currently running task (which specifies this task
          // as a dependency) marked it as such. it is actually performable.
        }
      } else {
        return didNotRun();
      }
    }

    let proc = Process.create({
      owner: task._hostObject,
      generatorFunction: task._genFn,
      propertyName: "TODO",
      _task: task,
    });
    task._proc = proc;

    this._incrementSemaphoresForTaskChain(task, +1);

    return new Ember.RSVP.Promise(r => {
      proc.start(args, returnValue => {
        this._taskDidFinish(task);
        r(returnValue);
      });
    });
  },
});

