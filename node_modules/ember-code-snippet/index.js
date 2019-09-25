'use strict';

const fs   = require('fs');
const mergeTrees = require('broccoli-merge-trees');
const flatiron = require('broccoli-flatiron');
const snippetFinder = require('./snippet-finder');
const findHost = require('./utils/findHost');

module.exports = {
  name: require('./package').name,

  snippetPaths() {
    let app = findHost(this);
    return app.options.snippetPaths || ['snippets'];
  },

  snippetSearchPaths(){
    let app = findHost(this);
    return app.options.snippetSearchPaths || ['app'];
  },

  snippetRegexes() {
    let app = findHost(this);
    return [{
      begin: /\bBEGIN-SNIPPET\s+(\S+)\b/,
      end: /\bEND-SNIPPET\b/
    }].concat(app.options.snippetRegexes || []);
  },

  snippetExtensions() {
    let app = findHost(this);
    return app.options.snippetExtensions || ['js','ts','coffee','html','hbs','md','css','sass','scss','less','emblem','yaml'];
  },

  includeExtensions() {
    let app = findHost(this);
    return app.options.includeFileExtensionInSnippetNames !== false;
  },

  includeHighlightJS() {
    let app = findHost(this);
    if (typeof app.options.includeHighlightJS === 'boolean') {
      return app.options.includeHighlightJS;
    } else {
      return true;
    }
  },

  includeHighlightStyle() {
    let app = findHost(this);
    if (typeof app.options.includeHighlightStyle === 'boolean') {
      return app.options.includeHighlightStyle;
    } else {
      return true;
    }
  },

  treeForApp(tree) {
    let snippets = mergeTrees(this.snippetPaths().filter(function(path){
      return fs.existsSync(path);
    }));

    let snippetOptions = {
      snippetRegexes: this.snippetRegexes(),
      includeExtensions: this.includeExtensions(),
      snippetExtensions: this.snippetExtensions()
    };

    snippets = mergeTrees(this.snippetSearchPaths().map(function(path){
      return snippetFinder(path, snippetOptions);
    }).concat(snippets));

    snippets = flatiron(snippets, {
      outputFile: 'snippets.js'
    });

    return mergeTrees([tree, snippets]);
  },

  included(app) {
    if (this.includeHighlightJS()) {
      app.import('vendor/highlight.pack.js', { using: [
          { transformation: 'amd', as: 'highlight.js' }
        ] } );
    }
    if (this.includeHighlightStyle()) {
      app.import('vendor/highlight-style.css');
    }
  }
};
