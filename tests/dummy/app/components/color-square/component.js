import Ember from 'ember';
import { process, sleep } from 'ember-concurrency';

export default Ember.Component.extend({
  attributeBindings: 'style',
  style: Ember.computed('color', function() {
    let color = this.get('color');
    return `width: 100px; height: 100px; background-color: ${color}`;
  }),

  color: 'red',

  init() {
    this._super();
    if (this.get('autoStart')) {
      this.get('colorAlternator').start();
    }
  },

  colorAlternator: process(function * () {
    let colors = ['red', 'blue', 'green'];
    for (;;) {
      for (let color of colors) {
        this.set('color', color);
        yield sleep(this.get('ms'));
      }
    }
  }),

  click() {
    let process = this.get('colorAlternator');
    if (process.isRunning) {
      process.kill();
    } else {
      process.start();
    }
  },
});
