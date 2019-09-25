const DIRECTORY_MODE = 16877;

import fs = require('fs');
export interface BaseEntry {
  relativePath: string;
  isDirectory() : boolean;
}

export interface DefaultEntry extends BaseEntry {
  relativePath: string;
  mode?: number;
  size?: number;
  mtime?: number | Date; // All algorithms coerce to number
  isDirectory() : boolean;
}

export default class Entry implements DefaultEntry {
  relativePath: string;
  mode?: number;
  size?: number;
  mtime?: number | Date; // All algorithms coerce to number

  constructor(relativePath:string, size?:number, mtime?: number | Date, mode?: number) {
    if (mode === undefined) {
      const isDirectory = relativePath.charAt(relativePath.length - 1) === '/';
      this.mode = isDirectory ? DIRECTORY_MODE : 0;
    } else {
      const modeType = typeof mode;
      if (modeType !== 'number') {
        throw new TypeError(`Expected 'mode' to be of type 'number' but was of type '${modeType}' instead.`);
      }
      this.mode = mode;
    }

    if (mtime !== undefined) {
      this.mtime = mtime;
    }

    this.relativePath = relativePath;
    this.size = size;
  }

  static isDirectory(entry: Entry) {
    if (entry.mode === undefined) {
      return false
    } else {
      return (entry.mode & 61440) === 16384
    }
  }

  static isFile(entry: Entry) {
    return !this.isDirectory(entry);
  }

  static fromStat(relativePath: string, stat: fs.Stats) {
    return new this(relativePath, stat.size, stat.mtime, stat.mode);
  }

  isDirectory() {
    return (this.constructor as typeof Entry).isDirectory(this);
  }
};


