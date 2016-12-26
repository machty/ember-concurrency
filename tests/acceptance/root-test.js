import { timeout } from 'ember-concurrency';
import { test } from 'ember-concurrency/qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import DocsController from 'dummy/docs/controller';

moduleForAcceptance('Acceptance | root');

DocsController.proto().get('flatContents').forEach(page => {
  test(`visiting ${page.route}`, function * (assert) {
    assert.expect(0);
    let url = page.route.replace(/\./g, '/');
    visit(url);
    yield timeout(500);
  });
});

