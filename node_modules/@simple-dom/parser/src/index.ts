import {
  SimpleDocument,
  SimpleDocumentFragment,
  SimpleNode,
} from '@simple-dom/interface';

export default class HTMLParser {
  private parentStack: SimpleNode[];

  constructor(private tokenize: Tokenizer, private document: SimpleDocument, private voidMap: IVoidMap) {
    this.tokenize = tokenize;
    this.document = document;
    this.voidMap = voidMap;
    this.parentStack = [];
  }

  public isVoid(element: SimpleNode) {
    return this.voidMap[element.nodeName] === true;
  }

  public pushElement(token: IStartTag) {
    const el = this.document.createElement(token.tagName);
    const attributes = token.attributes;
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      el.setAttribute(attr[0], attr[1]);
    }

    if (this.isVoid(el)) {
      return this.appendChild(el);
    }

    this.parentStack.push(el);
  }

  public popElement(token: IEndTag) {
    const el = this.parentStack.pop()!;

    if (el.nodeName !== token.tagName.toUpperCase()) {
      throw new Error('unbalanced tag');
    }

    this.appendChild(el);
  }

  public appendText(token: IChars) {
    this.appendChild(this.document.createTextNode(token.chars));
  }

  public appendComment(token: IComment) {
    this.appendChild(this.document.createComment(token.chars));
  }

  public appendChild(node: SimpleNode) {
    const parentNode = this.parentStack[this.parentStack.length - 1];
    parentNode.appendChild(node);
  }

  public parse(html: string): SimpleDocumentFragment {
    const fragment = this.document.createDocumentFragment();
    this.parentStack.push(fragment);

    const tokens = this.tokenize(html);
    for (let i = 0, l = tokens.length; i < l; i++) {
      const token = tokens[i];
      switch (token.type) {
        case 'StartTag':
          this.pushElement(token);
          break;
        case 'EndTag':
          this.popElement(token);
          break;
        case 'Chars':
          this.appendText(token);
          break;
        case 'Comment':
          this.appendComment(token);
          break;
      }
    }
    this.parentStack.pop();

    return fragment;
  }
}

export interface IVoidMap {
  [tagName: string]: boolean | undefined;
}

export type Tokenizer = (s: string) => Token[];

export type Token = IStartTag | IEndTag | IChars | IComment;

export type Attr = [string, string];

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
