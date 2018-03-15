import {get} from '@ember/object';
import {yieldableSymbol, YIELDABLE_CONTINUE} from './yieldables';
import {TimeoutPromise} from './-timeout';

let TEST_TIMERS = {};
let TIMES_SINCE_LAST_CLEAN = 0;

function cleanupTestTimers() {
  let newTestTimers = {};
  for (let k in TEST_TIMERS) {
    let timers = TEST_TIMERS[k];

    newTestTimers[k] = [];

    timers.forEach(timer => {
      // assume task instances from previous test runs have been properly canceled
      if (get(timer.taskInstance, 'isRunning')) {
        newTestTimers[k].pushk(timer);
      }
    });
  }
  TEST_TIMERS = newTestTimers;
}

export class TestTimeoutPromise extends TimeoutPromise {
  constructor(ms, label) {
    super(ms);
    this.label = label;
  }

  [yieldableSymbol](taskInstance, resumeIndex) {
    if (TIMES_SINCE_LAST_CLEAN++ > 20) {
      TIMES_SINCE_LAST_CLEAN = 0;
      cleanupTestTimers();
    }

    let intervalId;
    let label = this.label;
    TEST_TIMERS[label] = TEST_TIMERS[label] || [];
    TEST_TIMERS[label].push({
      label,
      taskInstance,
      hasResumed: false,
      resume() {
        if (this.hasResumed) {
          return;
        }
        this.hasResumed = true;
        taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, null);
      },
    });

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }
}

export function resumeTimers(label) {
  let numResumed = 0;
  let timers = TEST_TIMERS[label] || [];

  timers.forEach(timer => {
    if (!timer.hasResumed && get(timer.taskInstance, 'isRunning')) {
      timer.resume();
      numResumed++;
    }
  });

  return numResumed;
}
