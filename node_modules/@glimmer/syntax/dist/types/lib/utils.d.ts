import * as AST from './types/nodes';
import * as HBS from './types/handlebars-ast';
export declare function parseElementBlockParams(element: AST.ElementNode): void;
export declare function childrenFor(node: AST.Block | AST.Template | AST.ElementNode): AST.TopLevelStatement[];
export declare function appendChild(parent: AST.Block | AST.Template | AST.ElementNode, node: AST.Statement): void;
export declare function isLiteral(path: AST.PathExpression | HBS.PathExpression | AST.Literal | HBS.Literal): path is AST.Literal;
export declare function printLiteral(literal: AST.Literal): string;
//# sourceMappingURL=utils.d.ts.map