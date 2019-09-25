import fs = require('fs');
import path = require('path-posix');
import symlinkOrCopy = require('symlink-or-copy');
import Logger = require('heimdalljs-logger');

import Entry, { DefaultEntry, BaseEntry } from './entry';
import {
  sortAndExpand,
  validateSortedUnique
} from './util';

declare namespace FSTree {
  export type Operand = 'unlink' | 'rmdir' | 'create' | 'change' | 'mkdir';
  export type Operation = [Operand, string, DefaultEntry ] | [ Operand, string];
  export type Patch = Operation[];
  export type Entry = import('./entry').DefaultEntry;

  export interface Options {
    entries?: BaseEntry[],
    sortAndExpand?: boolean
  }

  export interface StaticOptions {
    sortAndExpand?: boolean
  }

  interface PatchDelegate {
    unlink?(inputPath: string, outputPath: string, relativePath: string) : void;
    rmdir?(inputPath: string, outputPath: string, relativePath: string) : void;
    mkdir?(inputPath: string, outputPath: string, relativePath: string) : void;
    change?(inputPath: string, outputPath: string, relativePath: string) : void;
    create?(inputPath: string, outputPath: string, relativePath: string) : void;
  }
}

const logger = Logger('fs-tree-diff:');
const ARBITRARY_START_OF_TIME = 0;
const DEFAULT_DELEGATE: FSTree.PatchDelegate  = {
  unlink(inputPath: string, outputPath: string, relativePath: string) {
    try {
      fs.unlinkSync(outputPath);
    } catch (e) {
      if (typeof e === 'object' && e !== null && e.code === 'ENOENT') {
        return;
      }
      throw e;
    }
  },
  rmdir(inputPath: string, outputPath: string, relativePath: string) {
    fs.rmdirSync(outputPath)
  },
  mkdir(inputPath: string, outputPath: string, relativePath: string) {
    fs.mkdirSync(outputPath);
  },
  change(inputPath: string, outputPath: string, relativePath: string) {
    // We no-op if the platform can symlink, because we assume the output path
    // is already linked via a prior create operation.
    if (symlinkOrCopy.canSymlink) {
      return;
    }

    fs.unlinkSync(outputPath);
    symlinkOrCopy.sync(inputPath, outputPath);
  },
  create(inputPath: string, outputPath: string, relativePath: string) {
    symlinkOrCopy.sync(inputPath, outputPath);
  }
};

class FSTree<T extends BaseEntry = DefaultEntry> {
  entries: T[]
  constructor(options: { entries?: T[], sortAndExpand?: boolean } = {}) {
    const entries = options.entries || [];

    if (options.sortAndExpand) {
      sortAndExpand(entries);
    } else {
      validateSortedUnique(entries);
    }

    this.entries = entries;
  }

  static fromPaths(paths: string[], options: FSTree.StaticOptions = {}) {
    const entries = paths.map(path => {
      return new Entry(path, 0, ARBITRARY_START_OF_TIME);
    });

    return new this({
      entries: entries,
      sortAndExpand: options.sortAndExpand,
    });
  }

  static fromEntries<T extends BaseEntry>(entries: T[], options: FSTree.StaticOptions = {}) {
    return new this({
      entries: entries,
      sortAndExpand: options.sortAndExpand,
    });
  }

  get size() {
    return this.entries.length;
  }

  addEntries(entries: T[], options?: FSTree.StaticOptions) {
    if (!Array.isArray(entries)) {
      throw new TypeError('entries must be an array');
    }
    if (options !== null && typeof options === 'object' && options.sortAndExpand) {
      sortAndExpand(entries);
    } else {
      validateSortedUnique(entries);
    }
    let fromIndex = 0;
    let toIndex = 0;
    while (fromIndex < entries.length) {
      while (toIndex < this.entries.length &&
        this.entries[toIndex].relativePath < entries[fromIndex].relativePath) {
        toIndex++;
      }
      if (toIndex < this.entries.length &&
        this.entries[toIndex].relativePath === entries[fromIndex].relativePath) {
        this.entries.splice(toIndex, 1, entries[fromIndex++]);
      } else {
        this.entries.splice(toIndex++, 0, entries[fromIndex++]);
      }
    }
  }

  addPaths(paths: string[], options?: FSTree.StaticOptions) {
    const entries = paths.map(path => {
      // TODO:
      // addPths + a custom isEqual comparator + custom Entry types are actually incompatible
      // As a addPaths will not abide by the custom Entry type
      // and will make this.entries be contain a mixture of types.
      // isEqual's arguments will then be typed incorrectly
      //
      // We should likely just deprecate `addPaths` in-favor of addEntries,
      // which correctly externalizes the creation of entry
      return new Entry(path, 0, ARBITRARY_START_OF_TIME) as T;
    });

    this.addEntries(entries, options);
  }

  forEach(fn: (entry: T, index: number, collection: T[]) => void, context: any) {
    this.entries.forEach(fn, context);
  }

  calculatePatch<K extends BaseEntry>(theirFSTree: FSTree<K>, isEqual?: (a: T, b: K) => boolean): FSTree.Patch {
    if (arguments.length > 1 && typeof isEqual !== 'function') {
      throw new TypeError('calculatePatch\'s second argument must be a function');
    }

    // TODO: the TS here is strange
    if (typeof isEqual !== 'function') {
      isEqual = (this.constructor as typeof FSTree).defaultIsEqual;
    }

    const ours = this.entries;
    const theirs = theirFSTree.entries;
    const additions: FSTree.Patch = [];
    const removals: FSTree.Patch = [];

    let i = 0;
    let j = 0;

    let command;

    while (i < ours.length && j < theirs.length) {
      let x = ours[i];
      let y = theirs[j];

      if (x.relativePath < y.relativePath) {
        // ours
        i++;

        removals.push(removeOperation(x));

        // remove additions
      } else if (x.relativePath > y.relativePath) {
        // theirs
        j++;
        additions.push(addOperation(y));
      } else {
        if (!isEqual(x, y)) {
          command = updateOperation(y);

          if (x.isDirectory()) {
            removals.push(command);
          } else {
            additions.push(command);
          }
        }
        // both are the same
        i++; j++;
      }
    }

    // cleanup ours
    for (; i < ours.length; i++) {
      removals.push(removeOperation(ours[i]));
    }

    // cleanup theirs
    for (; j < theirs.length; j++) {
      additions.push(addOperation(theirs[j]));
    }

    return removals.reverse().concat(additions);
  }

  calculateAndApplyPatch(otherFSTree: FSTree<T>, input: string, output: string, delegate?: FSTree.PatchDelegate) {
    (this.constructor as typeof FSTree).applyPatch(input, output, this.calculatePatch(otherFSTree), delegate);
  }

  static defaultIsEqual(entryA: DefaultEntry, entryB: DefaultEntry) {
    if (entryA.isDirectory() && entryB.isDirectory()) {
      // ignore directory changes by default
      return true;
    }

    let equal;
    if (entryA.size === entryB.size && entryA.mode === entryB.mode) {
      if (entryA.mtime === entryB.mtime) {
        equal = true;
      } else if (entryA.mtime === undefined || entryB.mtime === undefined) {
        equal = false;
      } else if (+entryA.mtime === +entryB.mtime) {
        equal = true;
      } else {
        equal = false;
      }
    } else {
      equal = false;
    }

    if (equal === false) {
      logger.info('invalidation reason: \nbefore %o\n entryB %o', entryA, entryB);
    }

    return equal;
  }

  static applyPatch(input: string, output: string, patch: FSTree.Patch, _delegate?: FSTree.PatchDelegate) {
    const delegate = {
      ...DEFAULT_DELEGATE,
      ..._delegate
    };
    for (let i = 0; i < patch.length; i++) {
      applyOperation(input, output, patch[i], delegate);
    }
  }
}

function applyOperation(input: string, output: string, operation: FSTree.Operation, delegate: FSTree.PatchDelegate) {
  const methodName = operation[0];
  const relativePath = operation[1];
  const inputPath = path.join(input, relativePath);
  const outputPath = path.join(output, relativePath);

  const method = delegate[methodName];

  if (typeof method === 'function') {
    method(inputPath, outputPath, relativePath);
  } else {
    throw new Error('Unable to apply patch operation: ' + methodName + '. The value of delegate.' + methodName + ' is of type ' + typeof method + ', and not a function. Check the `delegate` argument to `FSTree.prototype.applyPatch`.');
  }
}

function addOperation(entry: FSTree.Entry) : FSTree.Operation {
  return [
    entry.isDirectory() ? 'mkdir' : 'create',
    entry.relativePath,
    entry
  ];
}

function removeOperation(entry: FSTree.Entry) : FSTree.Operation {
  return [
    entry.isDirectory() ? 'rmdir' : 'unlink',
    entry.relativePath,
    entry
  ];
}

function updateOperation(entry: FSTree.Entry) : FSTree.Operation {
  return [
    'change',
    entry.relativePath,
    entry
  ];
};

export = FSTree;
