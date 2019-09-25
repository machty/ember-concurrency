"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var fs = require("fs");
var path = require("path-posix");
var symlinkOrCopy = require("symlink-or-copy");
var Logger = require("heimdalljs-logger");
var entry_1 = require("./entry");
var util_1 = require("./util");
var logger = Logger('fs-tree-diff:');
var ARBITRARY_START_OF_TIME = 0;
var DEFAULT_DELEGATE = {
    unlink: function (inputPath, outputPath, relativePath) {
        try {
            fs.unlinkSync(outputPath);
        }
        catch (e) {
            if (typeof e === 'object' && e !== null && e.code === 'ENOENT') {
                return;
            }
            throw e;
        }
    },
    rmdir: function (inputPath, outputPath, relativePath) {
        fs.rmdirSync(outputPath);
    },
    mkdir: function (inputPath, outputPath, relativePath) {
        fs.mkdirSync(outputPath);
    },
    change: function (inputPath, outputPath, relativePath) {
        // We no-op if the platform can symlink, because we assume the output path
        // is already linked via a prior create operation.
        if (symlinkOrCopy.canSymlink) {
            return;
        }
        fs.unlinkSync(outputPath);
        symlinkOrCopy.sync(inputPath, outputPath);
    },
    create: function (inputPath, outputPath, relativePath) {
        symlinkOrCopy.sync(inputPath, outputPath);
    }
};
var FSTree = /** @class */ (function () {
    function FSTree(options) {
        if (options === void 0) { options = {}; }
        var entries = options.entries || [];
        if (options.sortAndExpand) {
            util_1.sortAndExpand(entries);
        }
        else {
            util_1.validateSortedUnique(entries);
        }
        this.entries = entries;
    }
    FSTree.fromPaths = function (paths, options) {
        if (options === void 0) { options = {}; }
        var entries = paths.map(function (path) {
            return new entry_1.default(path, 0, ARBITRARY_START_OF_TIME);
        });
        return new this({
            entries: entries,
            sortAndExpand: options.sortAndExpand,
        });
    };
    FSTree.fromEntries = function (entries, options) {
        if (options === void 0) { options = {}; }
        return new this({
            entries: entries,
            sortAndExpand: options.sortAndExpand,
        });
    };
    Object.defineProperty(FSTree.prototype, "size", {
        get: function () {
            return this.entries.length;
        },
        enumerable: true,
        configurable: true
    });
    FSTree.prototype.addEntries = function (entries, options) {
        if (!Array.isArray(entries)) {
            throw new TypeError('entries must be an array');
        }
        if (options !== null && typeof options === 'object' && options.sortAndExpand) {
            util_1.sortAndExpand(entries);
        }
        else {
            util_1.validateSortedUnique(entries);
        }
        var fromIndex = 0;
        var toIndex = 0;
        while (fromIndex < entries.length) {
            while (toIndex < this.entries.length &&
                this.entries[toIndex].relativePath < entries[fromIndex].relativePath) {
                toIndex++;
            }
            if (toIndex < this.entries.length &&
                this.entries[toIndex].relativePath === entries[fromIndex].relativePath) {
                this.entries.splice(toIndex, 1, entries[fromIndex++]);
            }
            else {
                this.entries.splice(toIndex++, 0, entries[fromIndex++]);
            }
        }
    };
    FSTree.prototype.addPaths = function (paths, options) {
        var entries = paths.map(function (path) {
            // TODO:
            // addPths + a custom isEqual comparator + custom Entry types are actually incompatible
            // As a addPaths will not abide by the custom Entry type
            // and will make this.entries be contain a mixture of types.
            // isEqual's arguments will then be typed incorrectly
            //
            // We should likely just deprecate `addPaths` in-favor of addEntries,
            // which correctly externalizes the creation of entry
            return new entry_1.default(path, 0, ARBITRARY_START_OF_TIME);
        });
        this.addEntries(entries, options);
    };
    FSTree.prototype.forEach = function (fn, context) {
        this.entries.forEach(fn, context);
    };
    FSTree.prototype.calculatePatch = function (theirFSTree, isEqual) {
        if (arguments.length > 1 && typeof isEqual !== 'function') {
            throw new TypeError('calculatePatch\'s second argument must be a function');
        }
        // TODO: the TS here is strange
        if (typeof isEqual !== 'function') {
            isEqual = this.constructor.defaultIsEqual;
        }
        var ours = this.entries;
        var theirs = theirFSTree.entries;
        var additions = [];
        var removals = [];
        var i = 0;
        var j = 0;
        var command;
        while (i < ours.length && j < theirs.length) {
            var x = ours[i];
            var y = theirs[j];
            if (x.relativePath < y.relativePath) {
                // ours
                i++;
                removals.push(removeOperation(x));
                // remove additions
            }
            else if (x.relativePath > y.relativePath) {
                // theirs
                j++;
                additions.push(addOperation(y));
            }
            else {
                if (!isEqual(x, y)) {
                    command = updateOperation(y);
                    if (x.isDirectory()) {
                        removals.push(command);
                    }
                    else {
                        additions.push(command);
                    }
                }
                // both are the same
                i++;
                j++;
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
    };
    FSTree.prototype.calculateAndApplyPatch = function (otherFSTree, input, output, delegate) {
        this.constructor.applyPatch(input, output, this.calculatePatch(otherFSTree), delegate);
    };
    FSTree.defaultIsEqual = function (entryA, entryB) {
        if (entryA.isDirectory() && entryB.isDirectory()) {
            // ignore directory changes by default
            return true;
        }
        var equal;
        if (entryA.size === entryB.size && entryA.mode === entryB.mode) {
            if (entryA.mtime === entryB.mtime) {
                equal = true;
            }
            else if (entryA.mtime === undefined || entryB.mtime === undefined) {
                equal = false;
            }
            else if (+entryA.mtime === +entryB.mtime) {
                equal = true;
            }
            else {
                equal = false;
            }
        }
        else {
            equal = false;
        }
        if (equal === false) {
            logger.info('invalidation reason: \nbefore %o\n entryB %o', entryA, entryB);
        }
        return equal;
    };
    FSTree.applyPatch = function (input, output, patch, _delegate) {
        var delegate = __assign({}, DEFAULT_DELEGATE, _delegate);
        for (var i = 0; i < patch.length; i++) {
            applyOperation(input, output, patch[i], delegate);
        }
    };
    return FSTree;
}());
function applyOperation(input, output, operation, delegate) {
    var methodName = operation[0];
    var relativePath = operation[1];
    var inputPath = path.join(input, relativePath);
    var outputPath = path.join(output, relativePath);
    var method = delegate[methodName];
    if (typeof method === 'function') {
        method(inputPath, outputPath, relativePath);
    }
    else {
        throw new Error('Unable to apply patch operation: ' + methodName + '. The value of delegate.' + methodName + ' is of type ' + typeof method + ', and not a function. Check the `delegate` argument to `FSTree.prototype.applyPatch`.');
    }
}
function addOperation(entry) {
    return [
        entry.isDirectory() ? 'mkdir' : 'create',
        entry.relativePath,
        entry
    ];
}
function removeOperation(entry) {
    return [
        entry.isDirectory() ? 'rmdir' : 'unlink',
        entry.relativePath,
        entry
    ];
}
function updateOperation(entry) {
    return [
        'change',
        entry.relativePath,
        entry
    ];
}
;
module.exports = FSTree;
