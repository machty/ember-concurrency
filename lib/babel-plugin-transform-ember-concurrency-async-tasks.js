/* eslint-env node */
const { declare } = require('@babel/helper-plugin-utils');
const {
  yieldExpression,
  functionExpression,
  isArrowFunctionExpression,
  stringLiteral,
  nullLiteral,
  blockStatement,
  returnStatement,
} = require('@babel/types');

const { addNamed } = require('@babel/helper-module-imports');

const FACTORY_FUNCTION_BUFFER_POLICY_MAPPING = {
  task: null,
  restartableTask: 'restartable',
  dropTask: 'drop',
  keepLatestTask: 'keepLatest',
  enqueueTask: 'enqueue',
};

function resolveImport(path) {
  if (!path.node) {
    return;
  }

  if (path.node.type === 'Identifier') {
    let binding = path.scope.getBinding(path.node.name);

    if (binding && binding.kind === 'module') {
      let { node, parent } = binding.path;

      return {
        source: parent.source.value,
        isNamespace: node.type === 'ImportNamespaceSpecifier',
        isDefault: node.type === 'ImportDefaultSpecifier',
        isNamed: node.type === 'ImportSpecifier',
        name: node.type === 'ImportSpecifier' && node.imported.name,
      };
    }
  }
}

function isTaskFactoryFunctionImport(resolved) {
  return (
    resolved.isNamed &&
    resolved.source === 'ember-concurrency' &&
    resolved.name in FACTORY_FUNCTION_BUFFER_POLICY_MAPPING
  );
}

function taskFactoryFunction(path) {
  let resolved;
  if ((resolved = resolveImport(path))) {
    return isTaskFactoryFunctionImport(resolved) && resolved.name;
  }
  return false;
}

const TransformAsyncMethodsIntoGeneratorMethods = {
  /**
   * @param {babel.NodePath<babel.types.ClassProperty>} path
   */
  ClassProperty(path, state) {
    // Check for `myTask = task()`
    const value = path.node.value;
    if (value && value.type === 'CallExpression') {
      let factoryFunctionName = taskFactoryFunction(path.get('value.callee'));
      if (!factoryFunctionName) {
        return;
      }

      // Thus far, we've established that value is `myTask = task(...)`.
      // Now we need to check if the last argument is an async ArrowFunctionExpress

      const maybeAsyncArrowPath = path.get(
        `value.arguments.${value.arguments.length - 1}`
      );
      if (!maybeAsyncArrowPath && !maybeAsyncArrowPath.node) {
        return;
      }
      const maybeAsyncArrow = maybeAsyncArrowPath.node;
      if (
        maybeAsyncArrow &&
        maybeAsyncArrow.type === 'ArrowFunctionExpression' &&
        maybeAsyncArrow.async
      ) {
        convertFunctionExpressionIntoGenerator(
          maybeAsyncArrowPath,
          state,
          factoryFunctionName
        );
      }
    }
  },
};

function convertFunctionExpressionIntoGenerator(
  path,
  state,
  factoryFunctionName
) {
  if (path && path.node.async) {
    if (isArrowFunctionExpression(path)) {
      // At this point we have something that looks like
      //
      //    foo = task(this, {}?, async () => {})
      //
      // and we need to convert it to
      //
      //    foo = buildTask(this, options | null, generatorFn, taskName, bufferPolicyName?)

      // Replace the async arrow fn with a generator fn
      let body = path.node.body;
      if (body.type !== 'BlockStatement') {
        // Need to convert `async () => expr` with `async () => { return expr }`
        body = blockStatement([returnStatement(body)]);
      }
      path.replaceWith(
        functionExpression(path.node.id, path.node.params, body, true)
      );

      // Add an import to buildTask
      if (!state._buildTaskImport) {
        state._buildTaskImport = addNamed(
          state.root,
          'buildTask',
          'ember-concurrency/-private/async-arrow-runtime'
        );
      }

      // Rename `task()` to `buildTask()`
      path.parentPath.node.callee.name = state._buildTaskImport.name;

      // If there's only 2 args (e.g. `task(this, async () => {})`), add null where `options` would be.
      if (path.parentPath.node.arguments.length === 2) {
        path.parentPath.node.arguments.splice(1, 0, nullLiteral());
      }

      // Push taskName to the `task()` fn call.
      const taskName = extractTaskNameFromClassProperty(path);
      path.parentPath.node.arguments.push(stringLiteral(taskName));

      // Push buffer policy name to `buildTask()`
      const bufferPolicyName =
        FACTORY_FUNCTION_BUFFER_POLICY_MAPPING[factoryFunctionName];
      if (bufferPolicyName) {
        path.parentPath.node.arguments.push(stringLiteral(bufferPolicyName));
      }
    }
    path.traverse(TransformAwaitIntoYield);
  }
}

const TransformAwaitIntoYield = {
  Function(path) {
    path.skip();
  },
  AwaitExpression(path) {
    path.replaceWith(yieldExpression(path.get('argument').node));
  },
};

/**
 * Extract the name of the task, e.g. `foo = task(this, async () => {})` has a task name of "foo".
 * Classic ember-concurrency APIs (and decorators-based ones) know the name of the task, which we
 * used for error messages and other diagnostic / debugging functionality, but the newer
 * `foo = task(this, async () => {})` API needs a bit of help from this transform to determine the name;
 * in this method we extract the name from the ClassProperty assignment so that we can pass it in
 * to the options hash when constructing the Task.
 *
 * @param {babel.NodePath<babel.types.ArrowFunctionExpression>} asyncArrowFnPath
 * @returns {string | null}
 */
function extractTaskNameFromClassProperty(asyncArrowFnPath) {
  const maybeClassPropertyPath = asyncArrowFnPath.parentPath.parentPath;
  if (
    maybeClassPropertyPath &&
    maybeClassPropertyPath.node.type === 'ClassProperty'
  ) {
    return maybeClassPropertyPath.node.key.name;
  }
  return null;
}

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: 'transform-ember-concurrency-async-function-tasks',

    // Some of the transforms below need to run at an earlier time than other Babel transforms
    // that might be running. In order to facilitate this, we start from the more "root" AST node
    // of the ClassDeclaration/ClassExpression, and traverse its children to find the nodes
    // we'd likee to transform, rather than specifying those node types directly; if we had done
    // the latter, it's more likely that other Babel plugins would be have transformed these
    // AST nodes in a way that would break out transforms.
    visitor: {
      Program(path, state) {
        // Stash the program root on state so that it's easier to dynamically inject `import` later on
        state.root = path;
      },
      ClassDeclaration(path, state) {
        path.traverse(TransformAsyncMethodsIntoGeneratorMethods, state);
      },
      ClassExpression(path, state) {
        path.traverse(TransformAsyncMethodsIntoGeneratorMethods, state);
      },
    },
  };
});
