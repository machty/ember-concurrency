import RouteTemplate from 'ember-route-template';
import CodeSnippet from '../../components/code-snippet';

export default RouteTemplate(
  <template>
    <h3>Upgrading to Version 4</h3>

    <p>
      With version 4.0.0, Ember is now an
      <a href='https://rfcs.emberjs.com/id/0507-embroider-v2-package-format/'>V2
        Embroider Addon</a>.
    </p>

    <p>
      There is one main breaking change with this version: you will need to
      register/configure the Babel transform that Ember Concurrency uses to
      transform tasks in the "async-arrow" notation (e.g.
      <code>fooTask = task(async () =&gt; { /*...*/ })</code>
      into generator functions. This will need to be done in any consuming app
      or addon that uses the async-arrow task syntax:
    </p>

    <CodeSnippet @name='babel-transform-config.js' />
  </template>,
);
