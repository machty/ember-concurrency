import Ember from 'ember';
import { task } from 'ember-concurrency';

module('Unit: test environment');

test(`mock task can be created in a test`, function(assert) {
  assert.expect(1);

  let taskRan = false;
  let myMock = {
  	doAsync: task(function * () {
	    taskRan = true;
	    yield true;
	  })
  };

  Ember.run(() => {
    return Ember.get(myMock, 'doAsync').perform()
    .then(() => {
    	assert.ok(taskRan);
    });
  });
});



