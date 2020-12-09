import { task } from 'ember-concurrency';

export default class Foo {
  @task
  *doStuff(this: Foo) {
    // ...
  }

  executeTheTask() {
    this.doStuff.perform();
  }
}
