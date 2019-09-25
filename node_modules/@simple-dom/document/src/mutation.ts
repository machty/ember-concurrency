import { NodeType, SimpleDocumentFragment, SimpleNode } from '@simple-dom/interface';
import { SimpleElementImpl } from './node';

export function insertBefore(parentNode: SimpleNode, newChild: SimpleNode, refChild: SimpleNode | null): void {
  invalidate(parentNode as SimpleElementImpl);

  insertBetween(
    parentNode,
    newChild,
    refChild === null ? parentNode.lastChild : refChild.previousSibling,
    refChild);
}

export function removeChild(parentNode: SimpleNode, oldChild: SimpleNode): void {
  invalidate(parentNode as SimpleElementImpl);

  removeBetween(parentNode, oldChild, oldChild.previousSibling, oldChild.nextSibling);
}

function invalidate(parentNode: SimpleElementImpl) {
  const childNodes = parentNode._childNodes;
  if (childNodes !== undefined) {
    childNodes.stale = true;
  }
}

function insertBetween(
  parentNode: SimpleNode,
  newChild: SimpleNode,
  previousSibling: SimpleNode | null,
  nextSibling: SimpleNode | null,
) {
  if (newChild.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE) {
    insertFragment(newChild, parentNode, previousSibling, nextSibling);
    return;
  }

  if (newChild.parentNode !== null) {
    removeChild(newChild.parentNode, newChild);
  }

  newChild.parentNode = parentNode;
  newChild.previousSibling = previousSibling;
  newChild.nextSibling = nextSibling;

  if (previousSibling === null) {
    parentNode.firstChild = newChild;
  } else {
    previousSibling.nextSibling = newChild;
  }

  if (nextSibling === null) {
    parentNode.lastChild = newChild;
  } else {
    nextSibling.previousSibling = newChild;
  }
}

function removeBetween(
  parentNode: SimpleNode,
  oldChild: SimpleNode,
  previousSibling: SimpleNode | null,
  nextSibling: SimpleNode | null,
) {
  oldChild.parentNode = null;
  oldChild.previousSibling = null;
  oldChild.nextSibling = null;

  if (previousSibling === null) {
    parentNode.firstChild = nextSibling;
  } else {
    previousSibling.nextSibling = nextSibling;
  }

  if (nextSibling === null) {
    parentNode.lastChild = previousSibling;
  } else {
    nextSibling.previousSibling = previousSibling;
  }
}

function insertFragment(
  fragment: SimpleDocumentFragment,
  parentNode: SimpleNode,
  previousSibling: SimpleNode | null,
  nextSibling: SimpleNode | null,
): void {
  const firstChild = fragment.firstChild;
  if (firstChild === null) {
    return;
  }

  fragment.firstChild = null;
  fragment.lastChild = null;

  let lastChild = firstChild;
  let newChild: SimpleNode | null = firstChild;

  firstChild.previousSibling = previousSibling;
  if (previousSibling === null) {
    parentNode.firstChild = firstChild;
  } else {
    previousSibling.nextSibling = firstChild;
  }

  while (newChild !== null) {
    newChild.parentNode = parentNode;
    lastChild = newChild;
    newChild = newChild.nextSibling;
  }

  lastChild.nextSibling = nextSibling;
  if (nextSibling === null) {
    parentNode.lastChild = lastChild;
  } else {
    nextSibling.previousSibling = lastChild;
  }
}
