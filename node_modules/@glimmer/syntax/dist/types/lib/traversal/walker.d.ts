import { Option } from '@glimmer/interfaces';
import * as AST from '../types/nodes';
export declare type NodeCallback<N extends AST.Node> = (node: N, walker: Walker) => void;
export default class Walker {
    order?: any;
    stack: any[];
    constructor(order?: any);
    visit<N extends AST.Node>(node: Option<N>, callback: NodeCallback<N>): void;
    children(node: any, callback: any): void;
}
//# sourceMappingURL=walker.d.ts.map