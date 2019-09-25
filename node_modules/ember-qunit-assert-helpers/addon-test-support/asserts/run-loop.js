import Ember from 'ember';
import QUnit from 'qunit';

const { run } = Ember;

export default function() {
  QUnit.assert.expectNoRunLoop = function() {
    if (run.currentRunLoop) {
      this.pushResult({
        result: false,
        actual: run.currentRunLoop,
        expected: null,
        message: 'Should not be in a run loop at end of test'
      });

      while (run.currentRunLoop) {
        run.end();
      }
    }

    if (run.hasScheduledTimers()) {
      this.pushResult({
        result: false,
        actual: true,
        expected: false,
        message: 'Ember run should not have scheduled timers at end of test'
      });

      run.cancelTimers();
    }
  };
}
