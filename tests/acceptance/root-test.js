import { timeout } from 'ember-concurrency';
import { test } from '../../tests/helpers/generator-tests';
import { module } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import DocsController from 'dummy/docs/controller';

module('Acceptance | root', function(hooks) {
  setupApplicationTest(hooks);

  DocsController.proto().get('flatContents').forEach(page => {
    if (!page.route) { return; }
    test(`visiting ${page.route}`, function * (assert) {
      assert.expect(0);
      let url = page.route.replace(/\./g, '/');
      this.visit(url);
      yield timeout(500);
    });
  });
});
