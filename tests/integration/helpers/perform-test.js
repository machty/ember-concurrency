import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import Component from "@ember/component";
import { task } from "ember-concurrency";

module("Integration | helpers | perform", function (hooks) {
  setupRenderingTest(hooks);

  test("can wrap (perform) calls to instrument TaskInstance", async function (assert) {
    assert.expect(1);

    this.owner.register('component:test-swallow-error', Component.extend({
      errorGeneratingTask: task(function * () {
        throw new Error("You should not see me!");
      }),
    }));

    this.owner.register('template:components/test-swallow-error', hbs`
      <button {{on 'click' (swallow-error (perform this.errorGeneratingTask))}}>
        I create an error!
      </button>
    `);

    await render(hbs`<TestSwallowError />`);

    await click("button");

    assert.ok(true);
  });
});
