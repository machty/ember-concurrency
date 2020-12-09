import { task } from 'ember-concurrency';

export default class Foo {
  @task
  *doStuff(this: Foo) {
    // ...
  }

  executeTheTask() {
    // @ts-ignore
    this.doStuff.perform();
  }
}
