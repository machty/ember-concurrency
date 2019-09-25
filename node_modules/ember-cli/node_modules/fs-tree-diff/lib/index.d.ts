import Entry, { DefaultEntry, BaseEntry } from './entry';
declare namespace FSTree {
    type Operand = 'unlink' | 'rmdir' | 'create' | 'change' | 'mkdir';
    type Operation = [Operand, string, DefaultEntry] | [Operand, string];
    type Patch = Operation[];
    type Entry = import('./entry').DefaultEntry;
    interface Options {
        entries?: BaseEntry[];
        sortAndExpand?: boolean;
    }
    interface StaticOptions {
        sortAndExpand?: boolean;
    }
    interface PatchDelegate {
        unlink?(inputPath: string, outputPath: string, relativePath: string): void;
        rmdir?(inputPath: string, outputPath: string, relativePath: string): void;
        mkdir?(inputPath: string, outputPath: string, relativePath: string): void;
        change?(inputPath: string, outputPath: string, relativePath: string): void;
        create?(inputPath: string, outputPath: string, relativePath: string): void;
    }
}
declare class FSTree<T extends BaseEntry = DefaultEntry> {
    entries: T[];
    constructor(options?: {
        entries?: T[];
        sortAndExpand?: boolean;
    });
    static fromPaths(paths: string[], options?: FSTree.StaticOptions): FSTree<Entry>;
    static fromEntries<T extends BaseEntry>(entries: T[], options?: FSTree.StaticOptions): FSTree<T>;
    readonly size: number;
    addEntries(entries: T[], options?: FSTree.StaticOptions): void;
    addPaths(paths: string[], options?: FSTree.StaticOptions): void;
    forEach(fn: (entry: T, index: number, collection: T[]) => void, context: any): void;
    calculatePatch<K extends BaseEntry>(theirFSTree: FSTree<K>, isEqual?: (a: T, b: K) => boolean): FSTree.Patch;
    calculateAndApplyPatch(otherFSTree: FSTree<T>, input: string, output: string, delegate?: FSTree.PatchDelegate): void;
    static defaultIsEqual(entryA: DefaultEntry, entryB: DefaultEntry): boolean;
    static applyPatch(input: string, output: string, patch: FSTree.Patch, _delegate?: FSTree.PatchDelegate): void;
}
export = FSTree;
