import { SimpleDocument, SimpleDocumentFragment, SimpleNode } from '@simple-dom/interface';
export default class HTMLParser {
    private tokenize;
    private document;
    private voidMap;
    private parentStack;
    constructor(tokenize: Tokenizer, document: SimpleDocument, voidMap: IVoidMap);
    isVoid(element: SimpleNode): boolean;
    pushElement(token: IStartTag): void;
    popElement(token: IEndTag): void;
    appendText(token: IChars): void;
    appendComment(token: IComment): void;
    appendChild(node: SimpleNode): void;
    parse(html: string): SimpleDocumentFragment;
}
export interface IVoidMap {
    [tagName: string]: boolean | undefined;
}
export declare type Tokenizer = (s: string) => Token[];
export declare type Token = IStartTag | IEndTag | IChars | IComment;
export declare type Attr = [string, string];
export interface IStartTag {
    type: 'StartTag';
    tagName: string;
    attributes: Attr[];
}
export interface IEndTag {
    type: 'EndTag';
    tagName: string;
}
export interface IChars {
    type: 'Chars';
    chars: string;
}
export interface IComment {
    type: 'Comment';
    chars: string;
}
