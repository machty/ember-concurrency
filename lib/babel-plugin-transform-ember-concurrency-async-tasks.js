/* eslint-env node */
const { declare } = require('@babel/helper-plugin-utils');
const {
  yieldExpression,
  functionExpression,
  isArrowFunctionExpression,
  stringLiteral,
  nullLiteral,
  identifier,
  blockStatement,
  returnStatement,
  objectExpression,
  objectProperty,
  thisExpression,
  arrowFunctionExpression,
  callExpression,
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
      //    foo = task(this?, {}?, async () => {})
      //
      // and we need to convert it to
      //
      //    foo = buildTask(contextFn, options | null, taskName, bufferPolicyName?)
      //
      // where conextFn is
      //
      //    () => ({ context: this, generator: function * () { ... } })

      // Replace the async arrow fn with a generator fn
      let asyncArrowFnBody = path.node.body;
      if (asyncArrowFnBody.type !== 'BlockStatement') {
        // Need to convert `async () => expr` with `async () => { return expr }`
        asyncArrowFnBody = blockStatement([returnStatement(asyncArrowFnBody)]);
      }

      const taskGeneratorFn = functionExpression(
        path.node.id,
        path.node.params,
        asyncArrowFnBody,
        true
      );

      const contextFn = arrowFunctionExpression(
        [],
        objectExpression([
          objectProperty(identifier('context'), thisExpression()),
          objectProperty(identifier('generator'), taskGeneratorFn),
        ])
      );

      // Add an import to buildTask (if one hasn't already been added)
      if (!state._buildTaskImport) {
        state._buildTaskImport = addNamed(
          state.root,
          'buildTask',
          'ember-concurrency/-private/async-arrow-runtime'
        );
      }

      const originalArgs = path.parentPath.node.arguments;

      // task(this, async() => {}) was the original API, but we don't actually
      // need the `this` arg (we determine the `this` context from the contextFn async arrow fn)
      if (originalArgs[0] && originalArgs[0].type === 'ThisExpression') {
        originalArgs.shift();
      }

      const taskName = extractTaskNameFromClassProperty(path);
      let optionsOrNull;

      // remaining args should either be [options, async () => {}] or [async () => {}]
      switch (originalArgs.length) {
        case 1:
          optionsOrNull = nullLiteral();
          break;
        case 2:
          optionsOrNull = originalArgs[0];
          break;
        default:
          throw new Error(
            `The task() syntax you're using for the task named ${taskName} is incorrect.`
          );
      }

      // Push buffer policy name to `buildTask()`
      const bufferPolicyName =
        FACTORY_FUNCTION_BUFFER_POLICY_MAPPING[factoryFunctionName];

      // buildTask(contextFn, options | null, taskName, bufferPolicyName?)
      const buildTaskCall = callExpression(
        identifier(state._buildTaskImport.name),
        [
          contextFn,
          optionsOrNull,
          stringLiteral(taskName),
          bufferPolicyName ? stringLiteral(bufferPolicyName) : nullLiteral(),
        ]
      );

      let newPath = path.parentPath.replaceWith(buildTaskCall)[0];
      newPath.traverse({
        FunctionExpression(path) {
          if (!path.node.generator) {
            return;
          }
          path.traverse(TransformAwaitIntoYield);
        },
      });
    }
  }
}

const TransformAwaitIntoYield = {
  Function(path) {
    // This ensures we don't recurse into more deeply nested functions that
    // aren't supposed to be converted from await -> yield.
    path.skip();
  },
  AwaitExpression(path) {
    path.replaceWith(yieldExpression(path.get('argument').node));
  },
};

/**
 * Extract the name of the task, e.g. `foo = task(async () => {})` has a task name of "foo".
 * Classic ember-concurrency APIs (and decorators-based ones) know the name of the task, which we
 * used for error messages and other diagnostic / debugging functionality, but the newer
 * `foo = task(async () => {})` API needs a bit of help from this transform to determine the name;
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

        path.traverse(
          {
            ClassDeclaration(path, innerState) {
              path.traverse(
                TransformAsyncMethodsIntoGeneratorMethods,
                innerState
              );
            },
            ClassExpression(path, innerState) {
              path.traverse(
                TransformAsyncMethodsIntoGeneratorMethods,
                innerState
              );
            },
          },
          state
        );
      },
    },
  };
});
