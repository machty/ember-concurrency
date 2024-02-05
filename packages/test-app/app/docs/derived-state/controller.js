import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { randomWord } from 'test-app/utils';

let i = 0;
function* sharedFn(shouldError) {
  i++;

  yield timeout(1000);

  let words = [randomWord(), randomWord(), randomWord()];
  let wordsString = `${i}: ${words}`;

  if (shouldError) {
    throw new Error(wordsString);
  } else {
    return wordsString;
  }
}

// BEGIN-SNIPPET completion-state-controller
export default class DerivedStateController extends Controller {
  @task doStuff = sharedFn;
  @task({ drop: true }) doStuffDrop = sharedFn;
  @task({ enqueue: true }) doStuffEnqueue = sharedFn;
  @task({ restartable: true }) doStuffRestartable = sharedFn;

  showLessCommon = false;

  tasks = ['doStuff', 'doStuffDrop', 'doStuffEnqueue', 'doStuffRestartable'];

  @computed(
    'commonTaskProperties',
    'lessCommonTaskProperties',
    'showLessCommon',
  )
  get taskProperties() {
    return [
      ...this.commonTaskProperties,
      ...(this.showLessCommon ? this.lessCommonTaskProperties : []),
    ];
  }

  commonTaskProperties = ['last', 'lastSuccessful', 'lastErrored'];

  lessCommonTaskProperties = [
    'lastComplete',
    'lastPerformed',
    'lastIncomplete',
    'lastCanceled',
  ];

  @action
  performAll() {}
}
// END-SNIPPET
