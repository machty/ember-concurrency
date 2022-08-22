/* eslint-env node */
const { declare } = require('@babel/helper-plugin-utils');
const {
  yieldExpression,
  functionExpression,
  isFunctionExpression,
  isArrowFunctionExpression,
  stringLiteral,
  nullLiteral,
} = require('@babel/types');

const { addNamed } = require('@babel/helper-module-imports');

const TASK_DECORATORS = [
  'task',
  'restartableTask',
  'dropTask',
  'keepLatestTask',
  'enqueueTask',
];

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

function isTaskDecoratorImport(resolved) {
  return (
    resolved.isNamed &&
    resolved.source === 'ember-concurrency' &&
    TASK_DECORATORS.includes(resolved.name)
  );
}

function isTaskDecoratorNamespaceImport(resolved) {
  return resolved.isNamespace && resolved.source === 'ember-concurrency';
}

function isTaskDecorator(path) {
  let resolved,
    node = path.node;

  switch (node.type) {
    case 'Identifier': // @task async method() { ... }
      if ((resolved = resolveImport(path))) {
        return isTaskDecoratorImport(resolved);
      }

      break;

    case 'MemberExpression': // @my.task
      if ((resolved = resolveImport(path.get('object')))) {
        if (isTaskDecoratorNamespaceImport(resolved)) {
          return (
            path.node.property.type === 'Identifier' &&
            TASK_DECORATORS.includes(path.node.property.name)
          );
        }
      }

      break;

    case 'CallExpression': // @task(...) async method() { ... }
      return isTaskDecorator(path.get('callee'));
  }

  return false;
}

function hasTaskDecorator(path) {
  if (path.node.decorators) {
    for (let i = 0; i < path.node.decorators.length; i++) {
      if (isTaskDecorator(path.get(`decorators.${i}.expression`))) {
        return true;
      }
    }
  }

  return false;
}

function isTaskForImport(resolved) {
  return (
    resolved.isNamed &&
    resolved.name === 'taskFor' &&
    resolved.source === 'ember-concurrency-ts'
    // TODO: also check `resolved.source === 'ember-concurrency'` once we bring in taskFor
  );
}

function isTaskFor(path) {
  let resolved;
  if ((resolved = resolveImport(path))) {
    return isTaskForImport(resolved);
  }
  return false;
}

function isTaskFactoryFunctionImport(resolved) {
  return (
    resolved.isNamed &&
    resolved.name === 'task' &&
    resolved.source === 'ember-concurrency'
  );
}

function isTaskFactoryFunction(path) {
  let resolved;
  if ((resolved = resolveImport(path))) {
    return isTaskFactoryFunctionImport(resolved);
  }
  return false;
}

const TransformAsyncMethodsIntoGeneratorMethods = {
  /**
   * @param {babel.NodePath<babel.types.ClassMethod>} path
   */
  ClassMethod(path) {
    if (path.node.async && hasTaskDecorator(path)) {
      path.node.async = false;
      path.node.generator = true;
      path.traverse(TransformAwaitIntoYield);
    }
  },
  /**
   * @param {babel.NodePath<babel.types.ClassProperty>} path
   */
  ClassProperty(path, state) {
    if (hasTaskDecorator(path)) {
      path.traverse(TaskProperty);
      return;
    }

    // Check for `myTask = task()`
    const value = path.node.value;
    if (
      value &&
      value.type === 'CallExpression' &&
      isTaskFactoryFunction(path.get('value.callee'))
    ) {
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
        convertFunctionExpressionIntoGenerator(maybeAsyncArrowPath, state);
      }
    }
  },
};

const TaskProperty = {
  CallExpression(path, state) {
    if (isTaskFor(path.get('callee'))) {
      const firstArg = path.get('arguments.0');
      convertFunctionExpressionIntoGenerator(firstArg, state);
    }
  },
};

function convertFunctionExpressionIntoGenerator(path, state) {
  if (path && path.node.async) {
    if (isFunctionExpression(path)) {
      path.node.async = false;
      path.node.generator = true;
    }
    if (isArrowFunctionExpression(path)) {
      // Add an import to buildTask
      if (!state._buildTaskImport) {
        state._buildTaskImport = addNamed(
          state.root,
          'buildTask',
          'ember-concurrency/-private/task-public-api'
        );
      }

      const taskName = extractTaskNameFromClassProperty(path);

      // Push taskName to the `task()` fn call.
      path.parentPath.node.arguments.push(stringLiteral(taskName));

      // Rename `task()` to `buildTask()`
      path.parentPath.node.callee.name = state._buildTaskImport.name;

      // Replace the async arrow fn with a generator fn
      path.replaceWith(
        functionExpression(path.node.id, path.node.params, path.node.body, true)
      );

      // We want the call to be `buildTask(context, options, taskGeneratorFn, taskName)`, but
      // options is optional. If there's only 3 args, add null where `options` would be.
      if (path.parentPath.node.arguments.length === 3) {
        path.parentPath.node.arguments.splice(1, 0, nullLiteral());
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
