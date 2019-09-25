import { HasGuid } from './guid';
import { Option } from './platform-utils';
import { Dict, Stack } from '@glimmer/interfaces';
export interface Set<T> {
    add(value: T): Set<T>;
    delete(value: T): void;
}
export declare function dict<T = unknown>(): Dict<T>;
export declare function isDict<T>(u: T): u is Dict & T;
export declare function isObject<T>(u: T): u is object & T;
export declare type SetMember = HasGuid | string;
export declare class DictSet<T extends SetMember> implements Set<T> {
    private dict;
    constructor();
    add(obj: T): Set<T>;
    delete(obj: T): void;
}
export declare class StackImpl<T> implements Stack<T> {
    private stack;
    current: Option<T>;
    readonly size: number;
    push(item: T): void;
    pop(): Option<T>;
    nth(from: number): Option<T>;
    isEmpty(): boolean;
    toArray(): T[];
}
//# sourceMappingURL=collections.d.ts.map