import Entry from './entry';
export declare function validateSortedUnique(entries: Entry[]): void;
export declare function commonPrefix(a: string, b: string, term?: string): string;
export declare function basename(entry: Entry): string;
export declare function computeImpliedEntries(basePath: string, relativePath: string): Entry[];
export declare function compareByRelativePath(entryA: Entry, entryB: Entry): 1 | 0 | -1;
export declare function sortAndExpand(entries: Entry[]): Entry[];
