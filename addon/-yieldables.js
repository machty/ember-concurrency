import Ember from 'ember';
import TaskInstance from './-task-instance';

export function all(items) {
  let defer = Ember.RSVP.defer();
  Ember.RSVP.Promise.all(items).then(defer.resolve, defer.reject);

  let hasCancelled = false;
  let cancelAll = () => {
    if (hasCancelled) { return; }
    hasCancelled = true;
    items.forEach(it => {
      if (it instanceof TaskInstance) {
        it.cancel();
      }
    });
  };

  let promise = defer.promise.finally(cancelAll);
  promise.__ec_dispose__ = cancelAll;
  return promise;
}

