import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default class WritingTasksComponent extends Component {
  @task *myTask() {
    alert("hello!");
  }
}
