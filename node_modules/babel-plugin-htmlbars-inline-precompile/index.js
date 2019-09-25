'use strict';

module.exports = function(babel) {
  let t = babel.types;

  function compileTemplate(precompile, template) {
    let options = {
      contents: template
    }

    let compiledTemplateString = `Ember.HTMLBars.template(${precompile(template, options)})`;

    return compiledTemplateString;
  }

  return {
    visitor: {
      ImportDeclaration: function(path, state) {
        let node = path.node;

        let modulePaths = state.opts.modulePaths || ["htmlbars-inline-precompile"];
        let matchingModulePath = modulePaths.find(value => t.isLiteral(node.source, { value }));

        if (matchingModulePath) {
          let first = node.specifiers && node.specifiers[0];
          if (!t.isImportDefaultSpecifier(first)) {
            let input = state.file.code;
            let usedImportStatement = input.slice(node.start, node.end);
            let msg = `Only \`import hbs from '${matchingModulePath}'\` is supported. You used: \`${usedImportStatement}\``;
            throw path.buildCodeFrameError(msg);
          }

          state.importId = state.importId || path.scope.generateUidIdentifierBasedOnNode(path.node.id);
          path.scope.rename(first.local.name, state.importId.name);
          path.remove();
        }
      },

      TaggedTemplateExpression(path, state) {
        if (!state.importId) { return; }

        let tagPath = path.get('tag');
        if (tagPath.node.name !== state.importId.name) {
          return;
        }

        if (path.node.quasi.expressions.length) {
          throw path.buildCodeFrameError("placeholders inside a tagged template string are not supported");
        }

        let template = path.node.quasi.quasis.map(quasi => quasi.value.cooked).join('');

        path.replaceWithSourceString(compileTemplate(state.opts.precompile, template, state.file.opts.filename));
      },

      CallExpression(path, state) {
        if (!state.importId) { return; }

        let calleePath = path.get('callee');
        if (calleePath.node.name !== state.importId.name) {
          return;
        }

        let argumentErrorMsg = "hbs should be invoked with a single argument: the template string";
        if (path.node.arguments.length !== 1) {
          throw path.buildCodeFrameError(argumentErrorMsg);
        }

        let template = path.node.arguments[0].value;
        if (typeof template !== "string") {
          throw path.buildCodeFrameError(argumentErrorMsg);
        }

        path.replaceWithSourceString(compileTemplate(state.opts.precompile, template, state.file.opts.filename));
      },
    }
  };
};

module.exports._parallelBabel = {
  requireFile: __filename
};

module.exports.baseDir = function() {
  return __dirname;
};
