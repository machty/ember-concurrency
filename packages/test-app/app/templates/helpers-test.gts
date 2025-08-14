import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { cancelAll, forever, perform, task } from 'ember-concurrency';
import MyButton from '../components/my-button';

export default class HelpersTestRouteComponent extends Component {
  @tracked maybeNullTask = null;
  @tracked status = null;

  myTask = task(async (...args) => {
    try {
      this.status = args.join('-');
      await forever;
    } finally {
      this.status = 'canceled';
    }
  });

  valueTask = task(async (value) => {
    let expected = 'Set value option';
    if (value !== expected) {
      throw new Error(`value !== ${expected}. value is ${value}`);
    }
  });

  returnValue = task(async () => {
    return 10;
  });

  someTask = task(async () => {
    this.status = 'someTask';
  });

  @action
  setupTask() {
    this.maybeNullTask = this.someTask;
  }

  <template>
    <h1>Helpers Test</h1>

    <p class='task-status'>{{this.status}}</p>

    <MyButton
      @action={{perform this.myTask 1 2}}
      class='perform-task'
    >Perform</MyButton>
    <button
      {{on 'click' (cancelAll this.myTask)}}
      type='button'
      class='cancel-task'
    >Cancel</button>
    <MyButton @action={{perform this.returnValue}} class='value-task'>Return a
      Value</MyButton>

    <button
      {{on 'click' (perform this.maybeNullTask)}}
      class='maybe-null-task'
      type='button'
    >Maybe Null Task</button>
    <button {{on 'click' this.setupTask}} class='setup-task' type='button'>Setup
      Task</button>
    <button
      {{on 'click' (perform this.valueTask value='target.innerHTML')}}
      class='set-value-option-task'
      type='button'
    >Set value option</button>
  </template>
}
