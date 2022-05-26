/* eslint-env node */
const { declare } = require('@babel/helper-plugin-utils');
const {
  yieldExpression,
  functionExpression,
  isFunctionExpression,
  isArrowFunctionExpression,
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
  );
}

function isTaskFor(path) {
  let resolved;
  if ((resolved = resolveImport(path))) {
    return isTaskForImport(resolved);
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
      if (firstArg && firstArg.node.async) {
        if (isFunctionExpression(firstArg)) {
          firstArg.node.async = false;
          firstArg.node.generator = true;
        }
        if (isArrowFunctionExpression(firstArg)) {
          firstArg.replaceWith(
            functionExpression(
              firstArg.node.id,
              firstArg.node.params,
              firstArg.node.body,
              true
            )
          );
        }
        firstArg.traverse(TransformAwaitIntoYield);
      }
    }
  },
};

const TransformAwaitIntoYield = {
  Function(path) {
    path.skip();
  },
  AwaitExpression(path) {
    path.replaceWith(yieldExpression(path.get('argument').node));
  },
};

module.exports = declare((api) => {
  api.assertVersion(7);

  return {
    name: 'transform-ember-concurrency-async-tasks',

    // The decorator plugin removes the method decorators at the
    // class level, our code has to run before that to see them.
    visitor: {
      ClassDeclaration(path) {
        path.traverse(TransformAsyncMethodsIntoGeneratorMethods);
      },
      ClassExpression(path) {
        path.traverse(TransformAsyncMethodsIntoGeneratorMethods);
      },
    },
  };
});
