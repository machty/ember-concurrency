import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { timeout } from 'ember-concurrency';

moduleForAcceptance('Acceptance | ember-data integration');

test('perform and cancel-all', function(assert) {
  assert.expect(4);
  visit('/data-test');

  let buttonSel = `[data-test-selector="load-data-button"]`;

    let $button;
  andThen(() => {
    $button = Ember.$(buttonSel);
    assert.equal(Ember.$.trim($button.text()), 'Load');
    click($button);

    return timeout(30).then(() => {
      assert.equal(Ember.$.trim($button.text()), 'Loading');
    });
  }).then(() => {
    return andThen(() => {
      assert.equal(Ember.$.trim($button.text()), 'Load');
      assert.equal(Ember.$(`[data-test-selector="loaded-users"]`).text().replace(/\s/g, ''), "machtysnoop");
    });
  });
});

