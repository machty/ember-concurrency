import Entry from './entry';

export function validateSortedUnique(entries: Entry[]) {
  for (let i = 1; i < entries.length; i++) {
    let previous = entries[i - 1].relativePath;
    let current = entries[i].relativePath;

    if (previous < current) {
      continue;
    } else {
      throw new Error('expected entries[' + (i -1) + ']: `' + previous +
                      '` to be < entries[' + i + ']: `' + current + '`, but was not. Ensure your input is sorted and has no duplicate paths');
    }
  }
}

export function commonPrefix(a: string, b: string, term?: string) {
  let max = Math.min(a.length, b.length);
  let end = -1;

  for(var i = 0; i < max; ++i) {
    if (a[i] !== b[i]) {
      break;
    } else if (a[i] === term) {
      end = i;
    }
  }

  return a.substr(0, end + 1);
}

export function basename(entry: Entry) {
  const path = entry.relativePath;
  const end = path.length - 2;
  for (let i = end; i >= 0; --i) {
    if (path[i] === '/') {
      return path.substr(0, i + 1);
    }
  }

  return '';
}

export function computeImpliedEntries(basePath: string, relativePath: string) {
  let rv = [];

  for (var i=0; i < relativePath.length; ++i) {
    if (relativePath[i] === '/') {
      let path = basePath + relativePath.substr(0, i + 1);
      rv.push(new Entry(path, 0, 0));
    }
  }

  return rv;
}

export function compareByRelativePath(entryA: Entry, entryB: Entry) {
  const pathA = entryA.relativePath;
  const pathB = entryB.relativePath;

  if (pathA < pathB) {
    return -1;
  } else if (pathA > pathB) {
    return 1;
  }

  return 0;
}

export function sortAndExpand(entries: Entry[]) {
  entries.sort(compareByRelativePath);

  let path = '';

  for (let i=0; i<entries.length; ++i) {
    const entry = entries[i];

    // update our path eg
    //    path = a/b/c/d/
    //    entry = a/b/q/r/s/
    //    path' = a/b/
    path = commonPrefix(path, entry.relativePath, '/');

    // a/b/ -> a/
    // a/b  -> a/
    const base = basename(entry);
    // base - path
    const entryBaseSansCommon = base.substr(path.length);
    // determine what intermediate directories are missing eg
    //    path = a/b/
    //    entryBaseSansCommon = c/d/e/
    //    impliedEntries = [a/b/c/, a/b/c/d/, a/b/c/d/e/]
    const impliedEntries = computeImpliedEntries(path, entryBaseSansCommon);

    // actually add our implied entries to entries
    if (impliedEntries.length > 0) {
      entries.splice(i, 0, ...impliedEntries);
      i += impliedEntries.length;
    }

    // update path.  Now that we've created all the intermediate directories, we
    // don't need to recreate them for subsequent entries.
    if (entry.isDirectory()) {
      path = entry.relativePath;
    } else {
      path = base;
    }
  }

  return entries;
}
