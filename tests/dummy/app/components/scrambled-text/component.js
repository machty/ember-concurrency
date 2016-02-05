import Ember from 'ember';

import { timeout } from 'ember-concurrency';

// from http://stackoverflow.com/a/3943985/914123
function shuffle(word) {
  var a = word.split(""),
  n = a.length;

  for(var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}

export default Ember.Component.extend({
  tagName: '',
  text: null,
  scrambledText: null,
  startScrambling: Ember.on('init', function * () {
    let text = this.get('text');
    let pauseTime = 200;
    while (pauseTime > 50) {
      this.set('scrambledText', shuffle(text));
      yield timeout(pauseTime);
      pauseTime = pauseTime * 0.95;
    }
    this.set('scrambledText', text);
  }),
});


