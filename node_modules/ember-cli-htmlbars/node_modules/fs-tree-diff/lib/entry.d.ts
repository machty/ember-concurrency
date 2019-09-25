/// <reference types="node" />
import fs = require('fs');
export interface BaseEntry {
    relativePath: string;
    isDirectory(): boolean;
}
export interface DefaultEntry extends BaseEntry {
    relativePath: string;
    mode?: number;
    size?: number;
    mtime?: number | Date;
    isDirectory(): boolean;
}
export default class Entry implements DefaultEntry {
    relativePath: string;
    mode?: number;
    size?: number;
    mtime?: number | Date;
    constructor(relativePath: string, size?: number, mtime?: number | Date, mode?: number);
    static isDirectory(entry: Entry): boolean;
    static isFile(entry: Entry): boolean;
    static fromStat(relativePath: string, stat: fs.Stats): Entry;
    isDirectory(): boolean;
}
