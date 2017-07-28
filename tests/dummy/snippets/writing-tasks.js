import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  myTask: task(function * () {
    alert("hello!");
  })
});

