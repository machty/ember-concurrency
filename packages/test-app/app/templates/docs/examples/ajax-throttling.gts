import RouteTemplate from 'ember-route-template';
import AjaxThrottlingExample from '../../../components/ajax-throttling-example';
import CodeSnippet from '../../../components/code-snippet';

export default RouteTemplate(
  <template>
    <h3>Example: AJAX Throttling</h3>

    <p>
      Limiting the number of simultaneous AJAX requests (or the number of any
      kind of global, shared resource) can be accomplished using the
      <code>maxConcurrency</code>
      task modifier.
    </p>

    <p>
      In the example below, we render a component with 8 different concurrently
      running tasks that each, within an infinite loop, make (fake) AJAX
      requests. We've wrapped the code that actually performs the (fake) AJAX
      request in a task, and we've annotated that task with
      <code>@task({ maxConcurrency: 3 })</code>
      to ensure that no more than 3 AJAX requests can be run at a time (so that
      we don't overload the browser).
    </p>

    <h3>Live Example</h3>

    <AjaxThrottlingExample />

    <CodeSnippet @name='ajax-throttling.gts' />
  </template>,
);
