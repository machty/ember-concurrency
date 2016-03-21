import Ember from 'ember';
import { randomWord } from 'dummy/utils';

// BEGIN-SNIPPET performable-controller
import { task, timeout, Performable } from 'ember-concurrency';

let FileUpload = Performable.extend({
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
});

export default Ember.Controller.extend({
  uploadFile: task(FileUpload).enqueue(),

  makeRandomUrl() {
    return `https://www.${randomWord()}.edu`;
  }
});
// END-SNIPPET

