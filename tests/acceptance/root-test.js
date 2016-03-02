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

DocsController.proto().get('flatContents').forEach(page => {
  test(`visiting ${page.route}`, function(assert) {
    assert.expect(0);
    let url = page.route.replace(/\./g, '/');
    visit(url);
  });
});

