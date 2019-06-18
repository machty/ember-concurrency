import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';
import { run } from '@ember/runloop';

import DocsController from 'dummy/docs/controller';

module('Acceptance | root', function(hooks) {
  setupApplicationTest(hooks);

  DocsController.proto().get('flatContents').forEach(page => {
    if (!page.route) { return; }
    test(`visiting ${page.route}`, async function(assert) {
      assert.expect(0);
      let url = page.route.replace(/\./g, '/');
      setTimeout(() => run.cancelTimers(), 500);
      visit(url);
    });
  });
});
