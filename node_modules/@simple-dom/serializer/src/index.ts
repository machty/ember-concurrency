import {
  Namespace,
  SerializableAttr,
  SerializableAttrs,
  SerializableElement,
  SerializableNode,
} from '@simple-dom/interface';

const ESC: {
  [char: string]: string;
} = {
  '"': '&quot;',
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

function matcher(char: string) {
  return ESC[char];
}

function toLowerCase(name: string) {
  return name === 'DIV' ? 'div' : name === 'SPAN' ? 'span' : name.toLowerCase();
}

export default class HTMLSerializer {
  constructor(private voidMap: {
    [tagName: string]: boolean,
  }) {
  }

  public openTag(element: SerializableElement) {
    return '<' + this.tagName(element) + this.attributes(element.attributes) + '>';
  }

  public closeTag(element: SerializableElement) {
    return '</' + this.tagName(element) + '>';
  }

  public tagName(element: SerializableElement) {
    return element.namespaceURI === Namespace.HTML ? toLowerCase(element.nodeName) : element.nodeName;
  }

  public isVoid(element: SerializableElement) {
    return this.voidMap[element.nodeName] === true;
  }

  public attributes(attributes: SerializableAttrs) {
    let buffer = '';
    for (let i = 0, l = attributes.length; i < l; i++) {
      buffer += this.attr(attributes[i]);
    }
    return buffer;
  }

  public escapeAttrValue(attrValue: string) {
    if (attrValue.indexOf('&') > -1 || attrValue.indexOf('"') > -1) {
      return attrValue.replace(/[&"]/g, matcher);
    }

    return attrValue;
  }

  public attr(attr: SerializableAttr) {
    if (!attr.specified) {
      return '';
    }
    if (attr.value) {
      return ' ' + attr.name + '="' + this.escapeAttrValue(attr.value) + '"';
    }
    return ' ' + attr.name;
  }

  public escapeText(textNodeValue: string) {
    if (textNodeValue.indexOf('>') > -1 ||
        textNodeValue.indexOf('<') > -1 ||
        textNodeValue.indexOf('&') > -1
    ) {
      return textNodeValue.replace(/[&<>]/g, matcher);
    }

    return textNodeValue;
  }

  public text(text: SerializableNode) {
    return this.escapeText(text.nodeValue!);
  }

  public rawHTMLSection(text: SerializableNode): string {
    return text.nodeValue!;
  }

  public comment(comment: SerializableNode) {
    return '<!--' + comment.nodeValue + '-->';
  }

  public serializeChildren(node: SerializableNode) {
    let buffer = '';
    let next = node.firstChild;
    while (next !== null) {
      buffer += this.serialize(next);
      next = next.nextSibling;
    }
    return buffer;
  }

  public serialize(node: SerializableNode) {
    let buffer = '';

    // open
    switch (node.nodeType) {
      case 1:
        buffer += this.openTag(node as SerializableElement);
        break;
      case 3:
        buffer += this.text(node);
        break;
      case -1:
        buffer += this.rawHTMLSection(node);
        break;
      case 8:
        buffer += this.comment(node);
        break;
      default:
        break;
    }

    buffer += this.serializeChildren(node);

    if (node.nodeType === 1 && !this.isVoid(node as SerializableElement)) {
      buffer += this.closeTag(node as SerializableElement);
    }

    return buffer;
  }
}
