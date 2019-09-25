export type Prefix = string | null;
export type LocalName = string;
export type QualifiedName = [Prefix, LocalName];

export function parseQualifiedName(qualifiedName: string): QualifiedName {
  let localName = qualifiedName;
  let prefix: string | null = null;
  const i = qualifiedName.indexOf(':');
  if (i !== -1) {
    prefix = qualifiedName.slice(0, i);
    localName = qualifiedName.slice(i + 1);
  }
  return [prefix, localName];
}
