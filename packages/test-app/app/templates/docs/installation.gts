import { LinkTo } from '@ember/routing';
import RouteTemplate from 'ember-route-template';
import CodeSnippet from '../../components/code-snippet';

export default RouteTemplate(
  <template>
    <h3>Installation</h3>

    <p>
      Within your ember-cli project folder, run the following:
    </p>

    <CodeSnippet @name='ember-install.sh' />

    <p>
      (<strong>Recommended</strong>) To use with native JavaScript/TypeScript
      classes used throughout this documentation, ensure you also meet the
      following in your application/addon:

      <ul>
        <li>At least <code>ember-cli-babel@^7.7.2</code></li>
        <li>At least
          <code>@babel/core@^7.5.0</code>
          (as a transitive dependency via
          <code>ember-cli-babel</code>)</li>
      </ul>
    </p>

    <h4>Configure Babel Transform</h4>

    <p>
      Ember Concurrency requires the use of a Babel Transform to convert tasks
      in the "async-arrow" notation (e.g.
      <code>fooTask = task(async () =&gt; { /*...*/ })</code>
      into generator functions. Since Ember Concurrency 4.0.0 (which is an
      Embroider V2 Addon), this Babel transform needs to be configured on the
      consuming application or addon.
    </p>

    <CodeSnippet @name='babel-transform-config.js' />

    <h4>Typescript and Glint</h4>

    <p>
      <LinkTo @route='docs.typescript'>Typescript and Glint docs</LinkTo>
      for setting up / using Ember Concurency with TypeScript / Glint.
    </p>
  </template>,
);
