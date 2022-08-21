/* eslint-env node */
const { declare } = require('@babel/helper-plugin-utils');
const {
  yieldExpression,
  functionExpression,
  isFunctionExpression,
  isArrowFunctionExpression,
  stringLiteral,
} = require('@babel/types');

const TASK_DECORATORS = [
  'task',
  'restartableTask',
  'dropTask',
  'keepLatestTask',
  'enqueueTask',
];

function resolveImport(path) {
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
  ClassMethod(path) {
    if (path.node.async && hasTaskDecorator(path)) {
      path.node.async = false;
      path.node.generator = true;
      path.traverse(TransformAwaitIntoYield);
    }
  },
  ClassProperty(path) {
    if (hasTaskDecorator(path)) {
      path.traverse(TaskProperty);
    }
  },
};

const TaskProperty = {
  CallExpression(path) {
    if (isTaskFor(path.get('callee'))) {
      const firstArg = path.get('arguments.0');
      convertFunctionExpressionIntoGenerator(firstArg);
    }
  },
};

/**
 * Appends a taskName arg to the `task()` fn.
 *
 * - Converts `task(this, async () => {})` into `task(this, async () => {}, "taskName")`
 *
 * @param {babel.NodePath<babel.types.CallExpression>} callExpressionPath
 * @param {string} taskName
 */
function insertTaskNameIntoTaskOptions(callExpressionPath, taskName) {
  callExpressionPath.node.arguments.push(stringLiteral(taskName));
}

function convertFunctionExpressionIntoGenerator(path) {
  if (path && path.node.async) {
    if (isFunctionExpression(path)) {
      path.node.async = false;
      path.node.generator = true;
    }
    if (isArrowFunctionExpression(path)) {
      const taskName = extractTaskNameFromClassProperty(path);
      insertTaskNameIntoTaskOptions(path.parentPath, taskName);

      path.replaceWith(
        functionExpression(path.node.id, path.node.params, path.node.body, true)
      );
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

    // The decorator plugin removes the method decorators at the
    // class level, our code has to run before that to see them.
    visitor: {
      ArrowFunctionExpression(path) {
        // Detect async arrow fn arg within `task(this, async () => {})`.
        if (
          path.node.async &&
          path.parent.type === 'CallExpression' &&
          isTaskFactoryFunction(path.parentPath.get('callee'))
        ) {
          convertFunctionExpressionIntoGenerator(path);
        }
      },
      ClassDeclaration(path) {
        path.traverse(TransformAsyncMethodsIntoGeneratorMethods);
      },
      ClassExpression(path) {
        path.traverse(TransformAsyncMethodsIntoGeneratorMethods);
      },
    },
  };
});
