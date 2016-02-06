export function isGeneratorIterator(iter) {
  return (iter &&
          typeof iter.next      === 'function' &&
          typeof iter['return'] === 'function' &&
          typeof iter['throw']  === 'function');
}

export function Arguments(args) {
  this.args = args;
}

