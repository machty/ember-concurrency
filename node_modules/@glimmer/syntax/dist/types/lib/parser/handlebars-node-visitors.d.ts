import * as AST from '../types/nodes';
import * as HBS from '../types/handlebars-ast';
import { Parser } from '../parser';
import { Option } from '@glimmer/util';
export declare abstract class HandlebarsNodeVisitors extends Parser {
    abstract appendToCommentData(s: string): void;
    abstract beginAttributeValue(quoted: boolean): void;
    abstract finishAttributeValue(): void;
    cursorCount: number;
    cursor(): string;
    private readonly isTopLevel;
    Program(program: HBS.Program): AST.Block;
    Program(program: HBS.Program): AST.Template;
    Program(program: HBS.Program): AST.Template | AST.Block;
    BlockStatement(block: HBS.BlockStatement): AST.BlockStatement | void;
    MustacheStatement(rawMustache: HBS.MustacheStatement): AST.MustacheStatement | void;
    ContentStatement(content: HBS.ContentStatement): void;
    CommentStatement(rawComment: HBS.CommentStatement): Option<AST.MustacheCommentStatement>;
    PartialStatement(partial: HBS.PartialStatement): never;
    PartialBlockStatement(partialBlock: HBS.PartialBlockStatement): never;
    Decorator(decorator: HBS.Decorator): never;
    DecoratorBlock(decoratorBlock: HBS.DecoratorBlock): never;
    SubExpression(sexpr: HBS.SubExpression): AST.SubExpression;
    PathExpression(path: HBS.PathExpression): AST.PathExpression;
    Hash(hash: HBS.Hash): AST.Hash;
    StringLiteral(string: HBS.StringLiteral): AST.StringLiteral;
    BooleanLiteral(boolean: HBS.BooleanLiteral): AST.BooleanLiteral;
    NumberLiteral(number: HBS.NumberLiteral): AST.NumberLiteral;
    UndefinedLiteral(undef: HBS.UndefinedLiteral): AST.UndefinedLiteral;
    NullLiteral(nul: HBS.NullLiteral): AST.NullLiteral;
}
//# sourceMappingURL=handlebars-node-visitors.d.ts.map