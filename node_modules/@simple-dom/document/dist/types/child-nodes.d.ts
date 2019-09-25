import { SimpleChildNodes, SimpleNode } from '@simple-dom/interface';
export declare class ChildNodes implements SimpleChildNodes {
    private node;
    [index: number]: SimpleNode;
    stale: boolean;
    private _length;
    constructor(node: SimpleNode);
    readonly length: number;
    item(index: number): SimpleNode | null;
}
