import { module, test, skip } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import Component from "@ember/component";
import { task } from "ember-concurrency";

module("Integration |  promise-rejection", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register(
      "component:test-swallow-error",
      class TestSwallowErrorComponent extends Component {
        layout = hbs`
          <button {{on 'click' (swallow-error (perform this.errorGeneratingTask))}}>
            I create an error!
          </button>
        `;

        @task *errorGeneratingTask() {
          throw new Error("You should not see me!");
        }
      }
    );
  });

  skip("it renders", async function (assert) {
    await render(hbs`
      <TestSwallowError />
    `);

    await click("button");
  });
});
