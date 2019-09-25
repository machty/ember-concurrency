'use strict';

module.exports = makeArray;

// @param {all} subject
//     if nodelist, returns an array which generated from the nodelist
//     if Array, returns the array itself
//     otherwise, returns an array contains the subject
// @param {Array=} host
function makeArray (subject, host){
  // false    -> [false]
  // null     -> []
  // undefined  -> makeArray() -> []
  if (subject === undefined || subject === null) {
    return host || [];
  }

  // if is already an array
  if(Object.prototype.toString.call(subject) === '[object Array]'){
    return host
      ? host.concat(subject)
      : subject;
  }

  host || (host = []);
  if (isArrayLikeObject(subject)) {
    // IE fails on collections and <select>.options (refers to <select>)
    // use subject clone instead of Array.prototype.slice
    clonePureArray(subject, host);

  } else {
    host.push(subject);
  }

  return host;
};


// altered from jQuery
function isArrayLikeObject (subject) {
  var length = subject.length;

  if (
    typeof subject === 'function'
    || Object(subject) !== subject
    || typeof length !== 'number'
    // `window` already has a property `length`
    || 'setInterval' in subject
  ) {
    return false;
  }

  return length === 0
    || length > 0 && (length - 1) in subject;
}


/**
 * clone an object as a pure subject, and ignore non-number properties
 * @param {Array} subject
 * @param {Array|Object} host required, receiver which the subject be cloned to
 */
function clonePureArray(subject, host){
  var i = subject.length;
  var start = host.length;

  while(i --){
    host[start + i] = subject[i];
  }

  return host;
};
