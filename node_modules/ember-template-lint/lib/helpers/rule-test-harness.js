'use strict';

const assert = require('assert');

const Linter = require('../index');

function parseMeta(item) {
  let meta = item !== undefined && typeof item === 'object' && item.meta ? item.meta : {};
  meta.moduleId = meta.moduleId || 'layout.hbs';

  return meta;
}

/**
 * allows tests to be defined without needing to setup test infastructure everytime
 * @param  {Array}  [bad=[]]            - an array of items that describe the use case that should fail
 *  [{
     template: '{{debugger}}',

     result: {
       message,
       moduleId: 'layout.hbs',
       source: '{{debugger}}',
       line: 1,
       column: 0,
     },
   }]
 *
 * @param  {Array}  [error=[]]            - an array of items that describe the use case that should error
 *  [{
     config: 'sometimes',
     template: 'test',

     result: {
       fatal: true,
       moduleId: 'layout.hbs',
       message: 'You specified `"sometimes"`',
     },
   }]
 *
 * @param  {Array}    [good=[]]          - an array of strings that define templates that should not fail
 * [
     '<img alt="hullo">',
     '<img alt={{foo}}>',
     '<img alt="blah {{derp}}">',
     '<img aria-hidden="true">',
     '<img alt="">',
     '<img alt>',
   ]
 *
 * @param  {String}   name                - a name to describe which lint rule is being tested
 * @param  {Function} groupingMethodEach  - function to call before test setup is defined (mocha - beforeEach, qunit - beforeEach)
 * @param  {Function} groupingMethod      - function to call when test setup is defined (mocha - describe, qunit - module)
 * @param  {Function} testMethod          - function to call when test block is to be run (mocha - it, qunit - test)
 * @param  {Boolean}  skipDisabledTests   - boolean to skip disabled tests or not
 * @param  {Object}   config
 */
module.exports = function generateRuleTests({
  bad = [],
  good = [],
  error = [],
  name,
  groupingMethod,
  groupMethodBefore,
  testMethod,
  skipDisabledTests,
  config: passedConfig,
}) {
  groupingMethod(name, function() {
    let DISABLE_ALL = '{{! template-lint-disable }}';
    let DISABLE_ONE = `{{! template-lint-disable ${name} }}`;

    let linter, config, meta;

    function verify(template) {
      linter.config.rules[name] = config;
      return linter.verify({ source: template, moduleId: meta.moduleId });
    }

    groupMethodBefore(function() {
      let fullConfig = {
        rules: {},
      };
      fullConfig.rules[name] = config = passedConfig;

      meta = null;

      linter = new Linter({
        config: fullConfig,
      });
    });

    function parseResult(result) {
      let defaults = {
        severity: 2,
      };

      if (!skipDisabledTests) {
        defaults.rule = name;
      }

      if (result.moduleId !== null) {
        defaults.moduleId = 'layout.hbs';
      } else {
        delete result.moduleId;
      }

      return Object.assign({}, defaults, result);
    }

    bad.forEach(function(badItem) {
      let template = badItem.template;

      testMethod(`logs a message in the console when given \`${template}\``, function() {
        let expectedResults = badItem.results || [badItem.result];

        meta = parseMeta(badItem);

        if (badItem.config) {
          config = badItem.config;
        }

        let actual = verify(template);

        if (badItem.fatal) {
          assert.strictEqual(actual.length, 1); // can't have more than one fatal error
          delete actual[0].source; // remove the source (stack trace is not easy to assert)
          assert.deepStrictEqual(actual[0], badItem.fatal);
        } else {
          expectedResults = expectedResults.map(parseResult);

          assert.deepStrictEqual(actual, expectedResults);
        }
      });

      if (!skipDisabledTests) {
        testMethod(`passes with \`${template}\` when rule is disabled`, function() {
          config = false;
          meta = parseMeta(badItem);
          let actual = verify(template);

          assert.deepStrictEqual(actual, []);
        });

        testMethod(
          `passes with \`${template}\` when disabled via inline comment - single rule`,
          function() {
            meta = parseMeta(badItem);
            let actual = verify(DISABLE_ONE + '\n' + template);

            assert.deepStrictEqual(actual, []);
          }
        );

        testMethod(
          `passes with \`${template}\` when disabled via inline comment - all rules`,
          function() {
            meta = parseMeta(badItem);
            let actual = verify(DISABLE_ALL + '\n' + template);

            assert.deepStrictEqual(actual, []);
          }
        );
      }
    });

    good.forEach(function(goodItem) {
      let template = goodItem.template;

      testMethod(`passes when given \`${template}\``, function() {
        meta = parseMeta(goodItem);
        let actual;

        if (typeof goodItem === 'string') {
          actual = verify(goodItem);
        } else {
          if (goodItem.config !== undefined) {
            config = goodItem.config;
          }

          actual = verify(template);
        }

        assert.deepStrictEqual(actual, []);
      });
    });

    error.forEach(item => {
      let template = item.template;

      if (item.config !== undefined) {
        config = item.config;
      }

      let friendlyConfig = JSON.stringify(config);

      let _config = config;

      testMethod(`errors when given \`${template}\` with config \`${friendlyConfig}\``, function() {
        let expectedResults = item.results || [item.result];
        meta = parseMeta(item);
        expectedResults = expectedResults.map(parseResult);

        config = _config;

        let actual = verify(template);

        for (let i = 0; i < actual.length; i++) {
          if (actual[i].fatal) {
            delete expectedResults[i].rule;
            delete actual[i].source;

            assert.ok(actual[i].message.indexOf(expectedResults[i].message) > -1);

            delete actual[i].message;
            delete expectedResults[i].message;
          }
        }

        assert.deepStrictEqual(actual, expectedResults);
      });
    });
  });
};
