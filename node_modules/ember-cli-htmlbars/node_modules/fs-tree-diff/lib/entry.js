"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DIRECTORY_MODE = 16877;
var Entry = /** @class */ (function () {
    function Entry(relativePath, size, mtime, mode) {
        if (mode === undefined) {
            var isDirectory = relativePath.charAt(relativePath.length - 1) === '/';
            this.mode = isDirectory ? DIRECTORY_MODE : 0;
        }
        else {
            var modeType = typeof mode;
            if (modeType !== 'number') {
                throw new TypeError("Expected 'mode' to be of type 'number' but was of type '" + modeType + "' instead.");
            }
            this.mode = mode;
        }
        if (mtime !== undefined) {
            this.mtime = mtime;
        }
        this.relativePath = relativePath;
        this.size = size;
    }
    Entry.isDirectory = function (entry) {
        if (entry.mode === undefined) {
            return false;
        }
        else {
            return (entry.mode & 61440) === 16384;
        }
    };
    Entry.isFile = function (entry) {
        return !this.isDirectory(entry);
    };
    Entry.fromStat = function (relativePath, stat) {
        return new this(relativePath, stat.size, stat.mtime, stat.mode);
    };
    Entry.prototype.isDirectory = function () {
        return this.constructor.isDirectory(this);
    };
    return Entry;
}());
exports.default = Entry;
;
