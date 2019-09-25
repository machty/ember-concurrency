import { Option, Drop, DropSymbol, ChildrenSymbol } from '@glimmer/interfaces';
import { LinkedList, LinkedListNode } from './list-utils';
export declare const LINKED: WeakMap<object, Set<Drop>>;
export declare const DROP: DropSymbol;
export declare const CHILDREN: ChildrenSymbol;
export declare const DESTRUCTORS: WeakMap<object, any>;
export declare function isDrop(value: unknown): value is Drop;
export declare function associate(parent: object, child: object): void;
export declare function associateDestructor(parent: object, child: Drop): void;
export declare function takeAssociated(parent: object): Option<Set<Drop>>;
export declare function destroyAssociated(parent: object): void;
export declare function destructor(value: object): Drop;
export declare function snapshot(values: Set<Drop>): Drop;
export declare class ListContentsDestructor implements Drop {
    private inner;
    constructor(inner: LinkedList<LinkedListNode>);
    [DROP](): void;
    readonly [CHILDREN]: Iterable<Drop>;
    toString(): string;
}
export interface DebugNode {
    inner: object;
    children: DebugNode[] | null;
    hasDrop: boolean;
}
export declare function debugDropTree(inner: object): DebugNode;
export declare function printDropTree(inner: object): void;
export declare function printDrop(inner: Drop): void;
//# sourceMappingURL=lifetimes.d.ts.map