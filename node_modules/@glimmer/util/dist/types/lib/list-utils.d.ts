import { Option } from './platform-utils';
import { DROP, CHILDREN } from './lifetimes';
import { Drop } from '@glimmer/interfaces';
export interface LinkedListNode {
    next: Option<LinkedListNode>;
    prev: Option<LinkedListNode>;
}
export declare class ListNode<T> implements LinkedListNode {
    next: Option<ListNode<T>>;
    prev: Option<ListNode<T>>;
    value: T;
    constructor(value: T);
}
export declare class LinkedList<T extends LinkedListNode> implements Slice<T>, Drop {
    private _head;
    private _tail;
    constructor();
    head(): Option<T>;
    tail(): Option<T>;
    clear(): void;
    toArray(): T[];
    nextNode(node: T): T;
    forEachNode(callback: (node: T) => void): void;
    insertBefore(node: T, reference?: Option<T>): T;
    append(node: T): T;
    remove(node: T): T;
    [DROP](): void;
    readonly [CHILDREN]: Iterable<Drop>;
}
export interface Slice<T extends LinkedListNode> {
    head(): Option<T>;
    tail(): Option<T>;
    nextNode(node: T): Option<T>;
    forEachNode(callback: (node: T) => void): void;
    toArray(): T[];
}
export interface CloneableListNode extends LinkedListNode {
    clone(): this;
}
export declare class ListSlice<T extends LinkedListNode> implements Slice<T> {
    private _head;
    private _tail;
    constructor(head: Option<T>, tail: Option<T>);
    forEachNode(callback: (node: T) => void): void;
    head(): Option<T>;
    tail(): Option<T>;
    toArray(): T[];
    nextNode(node: T): Option<T>;
}
export declare const EMPTY_SLICE: ListSlice<LinkedListNode>;
//# sourceMappingURL=list-utils.d.ts.map