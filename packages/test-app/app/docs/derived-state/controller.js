import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';

let i = 0;

// BEGIN-SNIPPET completion-state-controller
export default class DerivedStateController extends Controller {
  doStuff = task(async () => {
    i++;

    await timeout(1000);

    let words = [randomWord(), randomWord(), randomWord()];
    let wordsString = `${i}: ${words}`;

    if (shouldError) {
      throw new Error(wordsString);
    } else {
      return wordsString;
    }
  });

  doStuffDrop = task({ drop: true }, async () => {
    await this.doStuff.perform();
  });

  doStuffEnqueued = task({ enqueue: true }, async () => {
    await this.doStuff.perform();
  });

  doStuffRestartable = task({ restartable: true }, async () => {
    await this.doStuff.perform();
  });

  @tracked
  showLessCommon = false;

  @action
  setShowLessCommon(event) {
    this.showLessCommon = event.target.checked;
  }

  tasks = ['doStuff', 'doStuffDrop', 'doStuffEnqueue', 'doStuffRestartable'];

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
