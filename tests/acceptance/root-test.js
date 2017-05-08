import { timeout } from 'ember-concurrency';
import { test } from '../../tests/helpers/generator-tests';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import DocsController from 'dummy/docs/controller';

moduleForAcceptance('Acceptance | root');

DocsController.proto().get('flatContents').forEach(page => {
  if (!page.route) { return; }
  test(`visiting ${page.route}`, function * (assert) {
    assert.expect(0);
    let url = page.route.replace(/\./g, '/');
    this.visit(url);
    yield timeout(500);
  });
});

