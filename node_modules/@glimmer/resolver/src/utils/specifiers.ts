import { Specifier } from '@glimmer/di';

export function detectLocalResolutionCollection(specifier: Specifier): string {
  let { namespace, collection } = specifier;

  // Look for the local-most private collection contained in the namespace
  // (which will appear closest to the end of the string)
  let startPos = namespace.lastIndexOf('/-');
  if (startPos > -1) {
    startPos += 2;
    let endPos = namespace.indexOf('/', startPos);
    collection = namespace.slice(startPos, endPos > -1 ? endPos : undefined);
  }

  return collection;
}
