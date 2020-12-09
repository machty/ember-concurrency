import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { lastValue } from 'ember-concurrency';

export default class ExampleComponent extends Component {
  @task
  *someTask() {
    // ...
  }

  @lastValue('someTask')
  someTaskValue;

  @lastValue('someTask')
  someTaskValueWithDefault = 'A default value';
}
