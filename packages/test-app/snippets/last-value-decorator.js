import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { lastValue } from 'ember-concurrency';

export default class ExampleComponent extends Component {
  someTask = task(async () => {
    // ...
  });

  @lastValue('someTask')
  someTaskValue;

  @lastValue('someTask')
  someTaskValueWithDefault = 'A default value';
}
