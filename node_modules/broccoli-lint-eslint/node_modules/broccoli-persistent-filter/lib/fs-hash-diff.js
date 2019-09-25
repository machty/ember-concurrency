/// @ts-check
"use strict";

// Imported for type annotations.
const Entry = require("fs-tree-diff/lib/entry").default; // jshint ignore:line
const FSTree = require("fs-tree-diff");

class HashEntry {
  /**
   * @param relativePath {string}
   * @param hash {string}
   */
  constructor(relativePath, hash) {
    this.relativePath = relativePath;
    this.hash = hash;
  }

  isDirectory() {
    return false;
  }

  /**
   * Whether the entries have the same content.
   * @param other {unknown}
   * @returns
   */
  equals(other) {
    if (other instanceof HashEntry) {
      return this.hash === other.hash;
    } else {
      return false;
    }
  }
}

class FSHashTree extends FSTree {
  /**
   * Creates an instance of FSHashTree.
   * @param [options] {{entries?: Array<Entry|HashEntry>, sortAndExpand?: boolean}}
   */
  constructor(options) {
    super(options);
    /** @type Array<Entry|HashEntry> */
    this.entries = options.entries || [];
  }
  /**
   * @param entryA {HashEntry | Entry}
   * @param entryB {HashEntry | Entry}
   * @returns {boolean}
   */
  static defaultIsEqual(entryA, entryB) {
    if (entryA instanceof HashEntry) {
      return entryA.equals(entryB);
    } else if (entryB instanceof HashEntry) {
      return false;
    } else {
      return super.defaultIsEqual(entryA, entryB);
    }
  }

  /**
   * @param entries {Array<HashEntry | Entry>}
   * @param [options] {{sortAndExpand?: boolean}}
   * @returns {FSHashTree}
   */
  static fromHashEntries(entries, options = {sortAndExpand: true}) {
    return new FSHashTree({
      entries,
      sortAndExpand: options.sortAndExpand
    });
  }
}

module.exports = {
  HashEntry,
  FSHashTree
};
