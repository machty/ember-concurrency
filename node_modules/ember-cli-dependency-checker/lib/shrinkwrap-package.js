'use strict';

const Package = require('./package');

class ShrinkwrapPackage extends Package {
  constructor(name, versionSpecified, versionInstalled, resolvedInstalled, parents) {
    super(name, versionSpecified, versionInstalled);

    this.resolvedInstalled = resolvedInstalled;
    this.parents = parents;

    if (this.needsUpdate && this.resolvedInstalled) {
      this.needsUpdate = this.versionSpecified !== this.resolvedInstalled;
    }
  }

  updateRequired() {
    return this.versionSpecified !== this.versionInstalled;
  }
}


module.exports = ShrinkwrapPackage;
