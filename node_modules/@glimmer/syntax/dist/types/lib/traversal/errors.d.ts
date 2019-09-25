import * as AST from '../types/nodes';
import { Option } from '@glimmer/interfaces';
export interface TraversalError extends Error {
    constructor: TraversalErrorConstructor;
    key: string;
    node: AST.Node;
    parent: Option<AST.Node>;
}
export interface TraversalErrorConstructor {
    new (message: string, node: AST.Node, parent: Option<AST.Node>, key: string): TraversalError;
    readonly prototype: TraversalError;
}
declare const TraversalError: TraversalErrorConstructor;
export default TraversalError;
export declare function cannotRemoveNode(node: AST.Node, parent: AST.Node, key: string): TraversalError;
export declare function cannotReplaceNode(node: AST.Node, parent: AST.Node, key: string): TraversalError;
export declare function cannotReplaceOrRemoveInKeyHandlerYet(node: AST.Node, key: string): TraversalError;
//# sourceMappingURL=errors.d.ts.map