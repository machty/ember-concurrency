'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.debugAssert = debugAssert;
exports.prodAssert = prodAssert;
exports.deprecate = deprecate;
// import Logger from './logger';
// let alreadyWarned = false;
function debugAssert(test, msg) {
    // if (!alreadyWarned) {
    //   alreadyWarned = true;
    //   Logger.warn("Don't leave debug assertions on in public builds");
    // }
    if (!test) {
        throw new Error(msg || 'assertion failure');
    }
}
function prodAssert() {}
function deprecate(desc) {
    console.warn(`DEPRECATION: ${desc}`);
}
exports.default = debugAssert;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3V0aWwvbGliL2Fzc2VydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztRQUlNLFcsR0FBQSxXO1FBV0EsVSxHQUFBLFU7UUFFQSxTLEdBQUEsUzs7QUFmTjtBQUVNLFNBQUEsV0FBQSxDQUFBLElBQUEsRUFBQSxHQUFBLEVBQTRDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBRUEsUUFBSSxDQUFKLElBQUEsRUFBVztBQUNULGNBQU0sSUFBQSxLQUFBLENBQVUsT0FBaEIsbUJBQU0sQ0FBTjtBQUNEO0FBQ0Y7QUFFSyxTQUFBLFVBQUEsR0FBb0IsQ0FBSztBQUV6QixTQUFBLFNBQUEsQ0FBQSxJQUFBLEVBQWdDO0FBQ3BDLFlBQUEsSUFBQSxDQUFhLGdCQUFnQixJQUE3QixFQUFBO0FBQ0Q7a0JBRUQsVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBMb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuXG4vLyBsZXQgYWxyZWFkeVdhcm5lZCA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVidWdBc3NlcnQodGVzdDogYW55LCBtc2c6IHN0cmluZykge1xuICAvLyBpZiAoIWFscmVhZHlXYXJuZWQpIHtcbiAgLy8gICBhbHJlYWR5V2FybmVkID0gdHJ1ZTtcbiAgLy8gICBMb2dnZXIud2FybihcIkRvbid0IGxlYXZlIGRlYnVnIGFzc2VydGlvbnMgb24gaW4gcHVibGljIGJ1aWxkc1wiKTtcbiAgLy8gfVxuXG4gIGlmICghdGVzdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihtc2cgfHwgJ2Fzc2VydGlvbiBmYWlsdXJlJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb2RBc3NlcnQoKSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZGVwcmVjYXRlKGRlc2M6IHN0cmluZykge1xuICBjb25zb2xlLndhcm4oYERFUFJFQ0FUSU9OOiAke2Rlc2N9YCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlYnVnQXNzZXJ0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==