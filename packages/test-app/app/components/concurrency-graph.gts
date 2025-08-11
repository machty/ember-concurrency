import { oneWay } from '@ember/object/computed';
import { A } from '@ember/array';
import Component from '@glimmer/component';
import { capitalize } from '@ember/string';
import EmberObject, { action, computed } from '@ember/object';
import { animationFrame, task } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { if } from '@ember/helper';
import { each } from '@ember/helper';
import pickFrom from '../helpers/pickFrom';
import scale from '../helpers/scale';
import subtract from '../helpers/subtract';
import width from '../helpers/width';
import sum from '../helpers/sum';

let Tracker = EmberObject.extend({
  id: null,
  performTime: null,
  startTime: null,
  endTime: oneWay('comp.timeElapsed'),
  comp: null,
  taskInstance: null,
  isCanceled: oneWay('taskInstance.isCanceled'),
  state: computed('taskInstance.state', function () {
    return capitalize(this.taskInstance.state);
  }),
  hasStarted: false,
});

interface ConcurrencyGraphSignature {
  Args: {
    task: any;
  };
}

export default class ConcurrencyGraphComponent extends Component<ConcurrencyGraphSignature> {
  @tracked trackers = A();
  @tracked timeElapsed = 0;
  startTime: number | null = null;
  nextId = 0;

  colors = ['red', 'green', 'blue'];
  labelHeights = [0, 20, 40, 60, 80, 100];

  constructor(owner: unknown, args: ConcurrencyGraphSignature['Args']) {
    super(owner, args);
    this.restart();
  }

  @computed('trackers.[]')
  get lowerLimit() {
    let trackers = this.trackers;
    if (!trackers) {
      return 0;
    }
    let v = Math.min(...trackers.mapBy('performTime'));
    return v;
  }

  @computed('timeElapsed')
  get upperLimit() {
    let timeElapsed = this.timeElapsed;
    return Math.max(10000, timeElapsed);
  }

  ticker = task({ drop: true }, async () => {
    while (true) {
      let now = +new Date();
      this.timeElapsed = now - (this.startTime || 0);
      await animationFrame();
    }
  });

  @action
  restart() {
    this.nextId = 0;
    this.trackers = A();
    this.ticker.cancelAll();
    this.timeElapsed = 0;
    this.startTime = 0;
  }

  @action
  startTask() {
    this.startTime = this.startTime || +new Date();
    let tracker = Tracker.create({
      id: this.nextId++,
      performTime: this.timeElapsed,
      comp: this,
      start: () => {
        tracker.set('hasStarted', true);
        tracker.set('startTime', this.timeElapsed || 1);
      },
      end: () => {
        tracker.set('endTime', this.timeElapsed);
      },
    });

    let task = this.args.task;
    let taskInstance = task.perform(tracker);
    tracker.set('taskInstance', taskInstance);

    this.trackers.pushObject(tracker);
    this.ticker.perform();
  }

  <template>
    <div>
      <button type="button" {{on "click" this.startTask}}>task.perform()</button>
      <button type="button" {{on "click" this.restart}}>Clear Timeline</button>
      {{#if @task.isRunning}}
        <button type="button" {{on "click" @task.cancelAll}}>Cancel All</button>
      {{/if}}

      <svg class="concurrency-graph">
        {{#each this.trackers as |tracker|}}
          <g class="concurrency-graph-tracker">
            {{#let (pickFrom this.colors tracker.id) as |color|}}
              {{#if tracker.hasStarted}}
                <rect x="{{scale (subtract tracker.startTime this.lowerLimit) this.lowerLimit this.upperLimit}}%"
                      y={{pickFrom this.labelHeights tracker.id}}
                      height="20px"
                      width="{{scale (width tracker.startTime tracker.endTime this.upperLimit) this.lowerLimit this.upperLimit}}%"
                      stroke="black"
                      fill={{color}}
                      fill-opacity="0.3" />
              {{/if}}

              {{#let (scale (subtract tracker.performTime this.lowerLimit) this.lowerLimit this.upperLimit) as |x|}}
                <text x="{{sum 0.5 x}}%"
                      y={{sum 15 (pickFrom this.labelHeights tracker.id)}}
                      font-family="Raleway"
                      fill={{color}}
                      font-size="14"
                      text-decoration={{if tracker.isCanceled "line-through" "none"}}
                      font-style={{if tracker.startTime "normal" "italic"}} >
                  {{tracker.state}}
                </text>
                {{#let (pickFrom this.labelHeights tracker.id) as |y|}}
                  <line x1="{{x}}%" y1={{y}} x2="{{x}}%" y2={{sum 20 y}} stroke={{color}} />
                {{/let}}
              {{/let}}
            {{/let}}
          </g>
        {{/each}}

        {{#let (scale this.timeElapsed this.lowerLimit this.upperLimit) as |x|}}
          <line x1="{{x}}%" y1="0" x2="{{x}}%" y2="100" stroke="black" />
        {{/let}}
      </svg>
    </div>
  </template>
}
