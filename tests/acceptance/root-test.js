import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import DocsController from 'dummy/docs/controller';

moduleForAcceptance('Acceptance | root');

const blacklist = {
  "docs.examples.autocomplete": true
};

DocsController.proto().get('flatContents').forEach(page => {
  if (blacklist[page.route]) { return; }
  test(`visiting ${page.route}`, function(assert) {
    assert.expect(0);
    let url = page.route.replace(/\./g, '/');
    visit(url);
  });
});

