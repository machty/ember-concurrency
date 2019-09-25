export interface Specifier {
  rootName?: string;
  collection?: string;
  namespace?: string;
  name?: string;
  type?: string;
}

export function isSpecifierStringAbsolute(specifier: string): boolean {
  let split = specifier.split(':');
  let type = split[0];
  let path = split[1];
  return !!(type && path && path.indexOf('/') === 0 && path.split('/').length > 3);
}

export function isSpecifierObjectAbsolute(specifier: Specifier): boolean {
  return specifier.rootName !== undefined &&
         specifier.collection !== undefined &&
         specifier.name !== undefined &&
         specifier.type !== undefined;
}

export function serializeSpecifier(specifier: Specifier): string {
  let type = specifier.type;
  let path = serializeSpecifierPath(specifier);

  if (path) {
    return type + ':' + path;
  } else {
    return type;
  }
}

export function serializeSpecifierPath(specifier: Specifier): string {
  let path = [];
  if (specifier.rootName) {
    path.push(specifier.rootName);
  }
  if (specifier.collection) {
    path.push(specifier.collection);
  }
  if (specifier.namespace) {
    path.push(specifier.namespace);
  }
  if (specifier.name) {
    path.push(specifier.name);
  }

  if (path.length > 0) {
    let fullPath = path.join('/');
    if (isSpecifierObjectAbsolute(specifier)) {
      fullPath = '/' + fullPath;
    }
    return fullPath;
  }
}

export function deserializeSpecifier(specifier: string): Specifier {
  let obj: Specifier = {};

  if (specifier.indexOf(':') > -1) {
    let split  = specifier.split(':');
    let type = split[0];
    let path = split[1];
    obj.type = type;

    let pathSegments;

    if (path.indexOf('/') === 0) {
      pathSegments = path.substr(1).split('/');
      if (path.substr(1).startsWith('@')) {
        obj.rootName = pathSegments.shift() + '/' + pathSegments.shift();
      } else {
        obj.rootName = pathSegments.shift();
      }
      obj.collection = pathSegments.shift();
    } else {
      pathSegments = path.split('/');
    }

    if (pathSegments.length > 0) {
      obj.name = pathSegments.pop();

      if (pathSegments.length > 0) {
        obj.namespace = pathSegments.join('/');
      }
    }

  } else {
    obj.type = specifier;
  }

  return obj;
}
