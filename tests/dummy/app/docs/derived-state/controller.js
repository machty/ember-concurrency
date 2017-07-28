import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { randomWord } from 'dummy/utils';

let i = 0;
function * sharedFn(shouldError) {
  i++;

  yield timeout(1000);

  let words = [ randomWord(), randomWord(), randomWord() ];
  let wordsString = `${i}: ${words}`;

  if (shouldError) {
    throw new Error(wordsString);
  } else {
    return wordsString;
  }
}


// BEGIN-SNIPPET completion-state-controller
export default Controller.extend({
  doStuff:            task(sharedFn),
  doStuffDrop:        task(sharedFn).drop(),
  doStuffEnqueue:     task(sharedFn).enqueue(),
  doStuffRestartable: task(sharedFn).restartable(),

  showLessCommon: false,

  tasks: [
    "doStuff",
    "doStuffDrop",
    "doStuffEnqueue",
    "doStuffRestartable",
  ],

  taskProperties: computed('showLessCommon', function() {
    return [
      ...this.get('commonTaskProperties'),
      ...(this.get('showLessCommon') ? this.get('lessCommonTaskProperties') : [])
    ];
  }),

  commonTaskProperties: [
    "last",
    "lastSuccessful",
    "lastErrored",
  ],

  lessCommonTaskProperties: [
    "lastComplete",
    "lastPerformed",
    "lastIncomplete",
    "lastCanceled",
  ],

  actions: {
    performAll() {
    }
  }
});
// END-SNIPPET

