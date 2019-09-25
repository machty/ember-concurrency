/**
 * @fileOverview no importing of test files and no exporting in test files
 */

'use strict';

const emberUtils = require('../utils/ember');

const NO_IMPORT_MESSAGE =
  'Do not import from a test file (a file ending in "-test.js") in another test file. Doing so will cause the module and tests from the imported file to be executed again.';

const NO_EXPORT_MESSAGE = 'No exports from test file. Any exports should be done in a test helper.';

module.exports = {
  meta: {
    docs: {
      description:
        'Disallow importing of "-test.js" in a test file and exporting from a test file.',
      category: 'Testing',
      recommended: false,
    },
    importMessage: NO_IMPORT_MESSAGE,
    exportMessage: NO_EXPORT_MESSAGE,
  },

  create: function create(context) {
    const noExports = function(node) {
      if (!emberUtils.isTestFile(context.getFilename())) {
        return;
      }

      context.report({
        message: NO_EXPORT_MESSAGE,
        node,
      });
    };

    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        if (importSource.endsWith('-test')) {
          context.report({
            message: NO_IMPORT_MESSAGE,
            node,
          });
        }
      },
      ExportNamedDeclaration(node) {
        noExports(node);
      },
      ExportDefaultDeclaration(node) {
        noExports(node);
      },
    };
  },
};
