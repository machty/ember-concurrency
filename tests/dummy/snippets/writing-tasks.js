import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default class WritingTasksComponent extends Component {
  myTask = task(async () => {
    alert("hello!");
  });
}
