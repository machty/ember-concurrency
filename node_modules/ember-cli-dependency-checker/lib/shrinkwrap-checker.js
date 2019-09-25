'use strict';

const readPackageJSON = require('./utils/read-package-json');
const ShrinkwrapPackage = require('./shrinkwrap-package');
const path = require('path');
const resolve = require('resolve');

class ShrinkwrapChecker {
  constructor(root, name, versionSpecified, parents, requiredFrom) {
    this.root = root;
    this.name = name;
    this.versionSpecified = versionSpecified;
    this.parents = parents;
    this.requiredFrom = requiredFrom;
  }

  check() {
    if (!this.root) {
      try {
        this.root = path.dirname(resolve.sync(path.join(this.name, 'package.json'), { basedir: this.requiredFrom }));
      } catch(err) {
        // not found
      }
    }
    let packageJSON;
    if (!this.root) {
      packageJSON = {};
    } else {
      packageJSON = readPackageJSON(this.root) || {};
    }

    const versionInstalled = packageJSON.version;
    const resolvedInstalled = packageJSON['_resolved'];

    return new ShrinkwrapPackage(
      this.name, this.versionSpecified, versionInstalled, resolvedInstalled, this.parents);
  }

  static checkDependencies(root, shrinkWrapJSON) {
    const nodesToCheck = [{
      root: root,
      parents: [],
      childDependencies: shrinkWrapJSON.dependencies,
      name: shrinkWrapJSON.name,
      version: shrinkWrapJSON.version
    }];

    const resolvedDependencies = [];
    let currentNode, checker, resolved;
    while ((currentNode = nodesToCheck.pop())) {
      checker = new ShrinkwrapChecker(
        currentNode.root, currentNode.name, currentNode.version, currentNode.parents, currentNode.requiredFrom);

      resolved = checker.check();
      resolvedDependencies.push(resolved);

      if (!resolved.needsUpdate && currentNode.childDependencies) {
        /* jshint loopfunc:true*/
        const parents = currentNode.parents.concat(currentNode.name);
        Object.keys(currentNode.childDependencies).forEach(function(childDepName){
          const childDep = currentNode.childDependencies[childDepName];

          nodesToCheck.push({
            requiredFrom: checker.root,
            parents: parents,
            name: childDepName,
            childDependencies: childDep.dependencies,
            version: childDep.version
          });
        });
      }
    }

    return resolvedDependencies;
  }
}


module.exports = ShrinkwrapChecker;
