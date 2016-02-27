import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

import DocsController from 'dummy/docs/controller';

moduleForAcceptance('Acceptance | root');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.ok(Ember.$('.navbar h3').text(), 'ember-concurrency');
  });
});

test('visiting all docs', function(assert) {
  visit('/');
  assert.expect(16);

  let contents = DocsController.proto().get('flatContents');
  let i = 0;
  function step() {
    let page = contents[i++];
    if (!page) { return; }

    let url = page.route.replace(/\./g, '/');
    return visit(url).then(() => {
      assert.ok(true, "page rendered ok");
      return step();
    });
  }

  return step();
});

