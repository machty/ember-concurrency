import { module, test, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { run, _cancelTimers } from '@ember/runloop';
import { FLATTENED_TABLE_OF_CONTENTS } from 'test-app/templates/docs';

const cancelTimers = _cancelTimers || run.cancelTimers;

module('Acceptance | root', function (hooks) {
  setupApplicationTest(hooks);

  FLATTENED_TABLE_OF_CONTENTS.forEach((page) => {
    if (!page.route) {
      return;
    }
    let testMethod = page.skipTest ? skip : test;
    testMethod(`visiting ${page.route}`, async function (assert) {
      assert.expect(0);
      let url = page.route.replace(/\./g, '/');

      visit(url);
      await new Promise((r) => {
        setTimeout(() => {
          cancelTimers();
          r();
        }, 200);
      });
      cancelTimers();
    });
  });
});
