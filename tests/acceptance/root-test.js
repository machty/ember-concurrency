import { module, test, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { gte } from 'ember-compatibility-helpers';
import RSVP from 'rsvp';
import DocsController from 'dummy/docs/controller';

let Promise = RSVP.Promise;

if (gte("3.4.0")) {
  Promise = window.Promise;
}

module('Acceptance | root', function(hooks) {
  setupApplicationTest(hooks);

  DocsController.proto().get('flatContents').forEach(page => {
    if (!page.route) { return; }
    let testMethod = page.skipTest ? skip : test;
    testMethod(`visiting ${page.route}`, async function(assert) {
      assert.expect(0);
      let url = page.route.replace(/\./g, '/');

      visit(url);
      await new Promise(r => {
        setTimeout(() => {
          run.cancelTimers();
          r();
        }, 200);
      });
      run.cancelTimers();
    });
  });
});
