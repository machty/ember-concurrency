import Controller from '@ember/controller';
import { randomWord } from 'dummy/utils';

// BEGIN-SNIPPET encapsulated-task-controller
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  uploadFile: task({
    progress: 0,
    url: null,
    perform: function * (makeUrl) {
      this.set('url', makeUrl());

      while (this.progress < 100) {
        yield timeout(100);
        let newProgress = this.progress + Math.floor(Math.random() * 6) + 5;
        this.set('progress', Math.min(100, newProgress));
      }

      return "Success!";
    },
  }).enqueue(),

  makeRandomUrl() {
    return `https://www.${randomWord()}.edu`;
  }
});
// END-SNIPPET

