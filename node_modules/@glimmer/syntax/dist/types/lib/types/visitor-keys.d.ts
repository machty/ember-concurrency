import * as AST from '../types/nodes';
declare const visitorKeys: {
    Program: ["body"];
    Template: ["body"];
    Block: ["body"];
    MustacheStatement: ["path", "params", "hash"];
    BlockStatement: ["path", "params", "hash", "program", "inverse"];
    ElementModifierStatement: ["path", "params", "hash"];
    PartialStatement: ["name", "params", "hash"];
    CommentStatement: [];
    MustacheCommentStatement: [];
    ElementNode: ["attributes", "modifiers", "children", "comments"];
    AttrNode: ["value"];
    TextNode: [];
    ConcatStatement: ["parts"];
    SubExpression: ["path", "params", "hash"];
    PathExpression: [];
    StringLiteral: [];
    BooleanLiteral: [];
    NumberLiteral: [];
    NullLiteral: [];
    UndefinedLiteral: [];
    Hash: ["pairs"];
    HashPair: ["value"];
};
declare type VisitorKeysMap = typeof visitorKeys;
export declare type VisitorKeys = {
    [P in keyof VisitorKeysMap]: VisitorKeysMap[P][number];
};
export declare type VisitorKey<N extends AST.Node> = VisitorKeys[N['type']] & keyof N;
export default visitorKeys;
//# sourceMappingURL=visitor-keys.d.ts.map