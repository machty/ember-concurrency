'use strict';

const path = require('path');

const babel = require('babel-core');
const HTMLBarsInlinePrecompile = require('../index');
const TransformTemplateLiterals = require('babel-plugin-transform-es2015-template-literals');
const TransformModules = require('babel-plugin-transform-es2015-modules-amd');

describe("htmlbars-inline-precompile", function() {
  let plugins, optionsReceived;

  function transform(code) {
    return babel.transform(code, {
      filename: 'foo-bar.js',
      plugins
    }).code.trim();
  }

  beforeEach(function() {
    optionsReceived = undefined;
    plugins = [
      [HTMLBarsInlinePrecompile, {
        precompile(template, options) {
          optionsReceived = options;
          return `precompiled(${template})`;
        }
      }],
    ];
  });

  it('passes options when used as a call expression', function() {
    let source = 'hello';
    transform(`import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs('${source}');`);

    expect(optionsReceived).toEqual({
      contents: source,
    });
  });

  it('passes options when used as a tagged template string', function() {
    let source = 'hello';
    transform(`import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs\`${source}\`;`);

    expect(optionsReceived).toEqual({
      contents: source,
    });
  });

  it("strips import statement for 'htmlbars-inline-precompile' module", function() {
    let transformed = transform("import hbs from 'htmlbars-inline-precompile';\nimport Ember from 'ember';");

    expect(transformed).toEqual("import Ember from 'ember';", "strips import statement");
  });

  it("throws error when import statement is not using default specifier", function() {
    expect(() => transform("import { hbs } from 'htmlbars-inline-precompile'"))
      .toThrow(/Only `import hbs from 'htmlbars-inline-precompile'` is supported/, "needed import syntax is present");

    expect(() => transform("import { hbs } from 'htmlbars-inline-precompile'"))
      .toThrow(/You used: `import { hbs } from 'htmlbars-inline-precompile'`/, "used import syntax is present");
  });

  it("replaces tagged template expressions with precompiled version", function() {
    let transformed = transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs`hello`;");

    expect(transformed).toEqual("var compiled = Ember.HTMLBars.template(precompiled(hello));", "tagged template is replaced");
  });

  it("replaces tagged template expressions with precompiled version for custom import paths", function() {
    plugins[0][1].modulePaths = ['ember-cli-htmlbars-inline-precompile'];

    let transformed = transform("import hbs from 'ember-cli-htmlbars-inline-precompile';\nvar compiled = hbs`hello`;");

    expect(transformed).toEqual("var compiled = Ember.HTMLBars.template(precompiled(hello));");
  });

  it("does not cause an error when no import is found", function() {
    expect(() => transform('something("whatever")')).not.toThrow();
    expect(() => transform('something`whatever`')).not.toThrow();
  });

  it("works with multiple imports", function() {
    let transformed = transform(`
      import hbs from 'htmlbars-inline-precompile';
      import otherHbs from 'htmlbars-inline-precompile';
      let a = hbs\`hello\`;
      let b = otherHbs\`hello\`;
    `);

    let expected = `let a = Ember.HTMLBars.template(precompiled(hello));\nlet b = Ember.HTMLBars.template(precompiled(hello));`;

    expect(transformed).toEqual(expected, "tagged template is replaced");
  });

  it("works properly when used along with modules transform", function() {
    plugins.push([TransformModules]);
    let transformed = transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs`hello`;");

    expect(transformed).toEqual(`define([], function () {\n  'use strict';\n\n  var compiled = Ember.HTMLBars.template(precompiled(hello));\n});`, "tagged template is replaced");
  });

  it("works properly when used after modules transform", function() {
    plugins.unshift([TransformModules]);
    let transformed = transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs`hello`;");

    expect(transformed).toEqual(`define([], function () {\n  'use strict';\n\n  var compiled = Ember.HTMLBars.template(precompiled(hello));\n});`, "tagged template is replaced");
  });

  it("replaces tagged template expressions when before babel-plugin-transform-es2015-template-literals", function() {
    plugins.push([TransformTemplateLiterals]);
    let transformed = transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs`hello`;");

    expect(transformed).toEqual("var compiled = Ember.HTMLBars.template(precompiled(hello));", "tagged template is replaced");
  });

  it("doesn't replace unrelated tagged template strings", function() {
    let transformed = transform('import hbs from "htmlbars-inline-precompile";\nvar compiled = anotherTag`hello`;');

    expect(transformed).toEqual("var compiled = anotherTag`hello`;", "other tagged template strings are not touched");
  });

  it("warns when the tagged template string contains placeholders", function() {
    expect(() => transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs`string ${value}`"))
      .toThrow(/placeholders inside a tagged template string are not supported/);
  });

  describe('caching', function() {
    it('include `baseDir` function for caching', function() {
      expect(HTMLBarsInlinePrecompile.baseDir()).toEqual(path.resolve(__dirname, '..'));
    });
  });

  describe('single string argument', function() {
    it("works with a plain string as parameter hbs('string')", function() {
      let transformed = transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs('hello');");

      expect(transformed).toEqual("var compiled = Ember.HTMLBars.template(precompiled(hello));", "tagged template is replaced");
    });

    it("warns when more than one argument is passed", function() {
      expect(() => transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs('first', 'second');"))
        .toThrow(/hbs should be invoked with a single argument: the template string/);
    });

    it("warns when argument is not a string", function() {
      expect(() => transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs(123);"))
        .toThrow(/hbs should be invoked with a single argument: the template string/);
    });

    it("warns when no argument is passed", function() {
      expect(() => transform("import hbs from 'htmlbars-inline-precompile';\nvar compiled = hbs();"))
        .toThrow(/hbs should be invoked with a single argument: the template string/);
    });
  });
});
