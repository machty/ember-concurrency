/* use strict */

const Plugin = require('broccoli-plugin');
const glob = require('glob');
const _Promise = require('es6-promise').Promise;
const fs = require('fs');
const path = require('path');


function findFiles(srcDir, options) {
  let fileNamePattern = `**/*.+(${options.snippetExtensions.join('|')})`;
  return new _Promise(function(resolve, reject) {
    glob(path.join(srcDir, fileNamePattern), function (err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function extractSnippets(fileContent, regexes) {
  let stack = [];
  let output = {};
  fileContent.split("\n").forEach(function(line){
    let top = stack[stack.length - 1];
    if (top && top.regex.end.test(line)) {
      output[top.name] = top.content.join("\n");
      stack.pop();
    }

    stack.forEach(function(snippet) {
      snippet.content.push(line);
    });

    let match;
    let regex = regexes.find(function(regex) {
      return match = regex.begin.exec(line);
    });

    if (match) {
      stack.push({
        regex: regex,
        name: match[1],
        content: []
      });
    }
  });
  return output;
}

function writeSnippets(files, outputPath, options) {
  files.forEach((filename) => {
    let regexes = options.snippetRegexes;
    let snippets = extractSnippets(fs.readFileSync(filename, 'utf-8'), regexes);
    for (let name in snippets) {
      let destFile = path.join(outputPath, name);
      let includeExtensions = options.includeExtensions;
      if (includeExtensions) {
        destFile += path.extname(filename);
      }
      fs.writeFileSync(destFile, snippets[name]);
    }
  });
}

function SnippetFinder(inputNode, options) {
  if (!(this instanceof SnippetFinder)) {
    return new SnippetFinder(inputNode, options);
  }

  Plugin.call(this, [inputNode], {
    name: 'SnippetFinder',
    annotation: `SnippetFinder output: ${options.outputFile}`,
    persistentOutput: options.persistentOutput,
    needCache: options.needCache,
  });

  this.options = options;
}

SnippetFinder.prototype = Object.create(Plugin.prototype);
SnippetFinder.prototype.constructor = SnippetFinder;

SnippetFinder.prototype.build = function() {
  return findFiles(this.inputPaths[0], this.options).then((files) => {
    writeSnippets(files, this.outputPath, this.options);
  });
};

module.exports = SnippetFinder;
