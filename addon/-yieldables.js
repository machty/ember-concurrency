import Ember from 'ember';
import TaskInstance from './-task-instance';

const RSVP = Ember.RSVP;

export let all = taskAwareVariantOf(RSVP.Promise, 'all');
export let race = taskAwareVariantOf(RSVP.Promise, 'race');

function taskAwareVariantOf(obj, method) {
  return function(items) {
    let defer = Ember.RSVP.defer();
    obj[method](items).then(defer.resolve, defer.reject);

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
  };
}

