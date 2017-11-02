import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { randomWord } from 'dummy/utils';

// BEGIN-SNIPPET encapsulated-task-controller
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  uploadFile: task({
    progress: 0,
    url: null,

    stateText: computed('progress', function() {
      let progress = this.get('progress');
      if (progress < 49) {
        return "Just started..."
      } else if (progress < 100) {
        return "Halfway there..."
      } else {
        return "Done!"
      }
    }),

    *perform(makeUrl) {
      this.set('url', makeUrl());

      while (this.progress < 100) {
        yield timeout(200);
        let newProgress = this.progress + Math.floor(Math.random() * 6) + 5;
        this.set('progress', Math.min(100, newProgress));
      }

      return "(upload result data)";
    },
  }).enqueue(),

  makeRandomUrl() {
    return `https://www.${randomWord()}.edu`;
  }
});
// END-SNIPPET

