import { task } from 'ember-concurrency';

export default class Foo {
  doStuff = task(this, async () => {
    // ...
  });

  executeTheTask() {
    // @ts-ignore
    this.doStuff.perform();
  }
}
