/// @ts-check
'use strict';

const FSTree = require('fs-tree-diff'); // jshint ignore:line

/**
 * Create a new patch that achieves the same outcome as if the patches from
 * list 1 were applied and then the patches from list2 were applied. In some
 * cases this means we can efficiently skip doing some work in one or both of
 * the lists.
 *
 * It is assumed that neither list contains more than one operation per file.
 *
 * If both lists patch the same file, the following resolution table is used:
 * * `3` - both patches are kept.
 * * `2` - the patch from list 2 is kept.
 * * `1` - the patch from list 1 is kept.
 * * `0` - both entries are dropped.
 * * `-` - not applicable
 * * `?` - this is weird maybe it should be an error
 *
 * TODO: This should probably live in `fs-tree-diff`.
 *
 * list1↓   | `unlink` | `create` | `change` | `rmdir` | `mkdir`
 * ---------|----------|----------|----------|---------|---------
 * `unlink` |     2    |     3    |     1    |    -    |    -
 * `create` |     0    |     2    |     1    |    -    |    -
 * `change` |     2    |     1?   |     2    |    -    |    -
 * `rmdir`  |     -    |     -    |     -    |    2    |    3
 * `mkdir`  |     -    |     -    |     -    |    0    |    2
 *
 * @param list1 {FSTree.Patch}
 * @param list2 {FSTree.Patch}
 * @returns {FSTree.Patch}
 */
function addPatches(list1, list2) {
  if (list1.length === 0) return list2;
  if (list2.length === 0) return list1;
  /** @type {{[key: string]: number}} */
  let filesInList1 = {};
  for (let i = 0; i < list1.length; i++) {
    filesInList1[list1[i][1]] = i;
  }
  /** @type {{[key: string]: [number, number]}} */
  let filesInBothLists = {};
  for (let i = 0; i < list2.length; i++) {
    let name = list2[i][1];
    if (typeof filesInList1[name] !== 'undefined') {
      filesInBothLists[name] = [filesInList1[name], i];
    }
  }

  // These two for loops are structurally similar but I feel that the DRY
  // principle, if applied here, makes the code less understandable.

  /** @type FSTree.Patch */
  let patch = [];
  // keep the patches in list 1 if applicable
  for (let i = 0; i < list1.length; i++) {
    let operation = list1[i];
    let name = operation[1];
    if (filesInBothLists[name]) {
      let op1 = list1[filesInBothLists[name][0]][0];
      let op2 = list2[filesInBothLists[name][1]][0];
      if (
        (op1 === 'change' && op2 === 'change') ||
        (op1 === 'change' && op2 === 'unlink') ||
        (op1 === 'unlink' && op2 === 'unlink') ||
        (op1 === 'create' && op2 === 'unlink') ||
        (op1 === 'create' && op2 === 'create') ||
        (op1 === 'rmdir'  && op2 === 'rmdir' ) ||
        (op1 === 'mkdir')
      ) {
        // dropped from list 1 or from both lists
        continue;
      }
    }
    patch.push(operation);
  }

  // keep the patches in list 2 if applicable
  for (let i = 0; i < list2.length; i++) {
    let operation = list2[i];
    let name = operation[1];
    if (filesInBothLists[name]) {
      let op1 = list1[filesInBothLists[name][0]][0];
      let op2 = list2[filesInBothLists[name][1]][0];
      if (
        (op1 === 'change' && op2 === 'create') ||
        (op1 === 'unlink' && op2 === 'change') ||
        (op1 === 'create' && op2 === 'unlink') ||
        (op1 === 'create' && op2 === 'change') ||
        (op1 === 'mkdir'  && op2 === 'rmdir' )
      ) {
        // dropped from list 2 or from both lists
        continue;
      }
    }
    patch.push(operation);
  }
  return patch;
}

module.exports = addPatches;
