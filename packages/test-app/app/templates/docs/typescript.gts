import RouteTemplate from 'ember-route-template';
import CodeSnippet from '../../components/code-snippet';

export default RouteTemplate(
  <template>
    <h3>TypeScript and Glint</h3>

    <p>
      Ember Concurrency tasks play nicely with TypeScript and all of the APIs
      covered in these docs. Here is an example of a TypeScript component with
      an ember-concurrency task:
    </p>

    <CodeSnippet @name='ts/basic-example.ts' />

    <h4>Glint Template Registry</h4>

    <p>
      Ember Concurrency provides a template registry for using the
      <code>perform</code>,
      <code>cancel-all</code>, and
      <code>task</code>
      helpers within handlebars templates in Glint "loose mode". See the example
      below for how to include Ember Concurrency's template registry in your
      Glint configuration.
    </p>

    <CodeSnippet @name='ts/template-registry-example.ts' />

    <h4>Ember Template Imports (.gts/.gts) Files</h4>

    <p>
      Here is an example of a modern .gts file in "strict mode" which imports
      the classic
      <code>perform</code>
      helper from Ember Concurrency.
    </p>

    <p>
      Note: while you can import and use the
      <code>perform</code>
      helper, it is actually recommended to use the
      <code>.perform()</code>
      method on each task, which is internally bound to the task (similar to
      methods decorated with
      <code>@action</code>). One of the benefits of using the
      <code>.perform()</code>
      method is that it can be used with modern idiomatic patterns like using
      the
      <code>fn</code>
      helper to curry additional args when performing the task.
    </p>

    <p>
      <em>Pardon the lack of syntax! PR's welcome to improve our syntax
        highlighting!</em>
    </p>

    <CodeSnippet @name='ts/template-import-example.txt' />

    <h4>Typing <code>Task</code> objects</h4>

    <p>
      In most cases, you don't need to provide type annotations for your task,
      but when you do (such as when
      <a
        href='https://docs.ember-cli-typescript.com/ember/components?q=component#giving-args-a-type'
      >
        specifying the Args of a Glimmer component</a>), you can use the Task
      type:
    </p>

    <CodeSnippet @name='ts/typing-task.ts' />
  </template>,
);
