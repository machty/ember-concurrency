import { SimpleChildNodes, SimpleNode } from '@simple-dom/interface';

export class ChildNodes implements SimpleChildNodes {
  [index: number]: SimpleNode;

  public stale = true;

  private _length = 0;

  constructor(private node: SimpleNode) {
  }

  public get length() {
    if (this.stale) {
      this.stale = false;
      let len = 0;
      let child = this.node.firstChild;

      for (; child !== null; len++) {
        this[len] = child;
        child = child.nextSibling;
      }

      const oldLen = this._length;
      this._length = len;

      for (; len < oldLen; len++) {
        delete this[len];
      }
    }
    return this._length;
  }

  public item(index: number): SimpleNode | null {
    return index < this.length ? this[index] : null;
  }
}
