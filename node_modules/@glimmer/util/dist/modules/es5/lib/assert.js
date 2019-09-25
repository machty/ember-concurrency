// import Logger from './logger';
// let alreadyWarned = false;
export function debugAssert(test, msg) {
    // if (!alreadyWarned) {
    //   alreadyWarned = true;
    //   Logger.warn("Don't leave debug assertions on in public builds");
    // }
    if (!test) {
        throw new Error(msg || 'assertion failure');
    }
}
export function prodAssert() {}
export function deprecate(desc) {
    console.warn('DEPRECATION: ' + desc);
}
export default debugAssert;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL0BnbGltbWVyL3V0aWwvbGliL2Fzc2VydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7QUFFQSxPQUFNLFNBQUEsV0FBQSxDQUFBLElBQUEsRUFBQSxHQUFBLEVBQTRDO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBRUEsUUFBSSxDQUFKLElBQUEsRUFBVztBQUNULGNBQU0sSUFBQSxLQUFBLENBQVUsT0FBaEIsbUJBQU0sQ0FBTjtBQUNEO0FBQ0Y7QUFFRCxPQUFNLFNBQUEsVUFBQSxHQUFvQixDQUFLO0FBRS9CLE9BQU0sU0FBQSxTQUFBLENBQUEsSUFBQSxFQUFnQztBQUNwQyxZQUFBLElBQUEsbUJBQUEsSUFBQTtBQUNEO0FBRUQsZUFBQSxXQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IExvZ2dlciBmcm9tICcuL2xvZ2dlcic7XG5cbi8vIGxldCBhbHJlYWR5V2FybmVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJ1Z0Fzc2VydCh0ZXN0OiBhbnksIG1zZzogc3RyaW5nKSB7XG4gIC8vIGlmICghYWxyZWFkeVdhcm5lZCkge1xuICAvLyAgIGFscmVhZHlXYXJuZWQgPSB0cnVlO1xuICAvLyAgIExvZ2dlci53YXJuKFwiRG9uJ3QgbGVhdmUgZGVidWcgYXNzZXJ0aW9ucyBvbiBpbiBwdWJsaWMgYnVpbGRzXCIpO1xuICAvLyB9XG5cbiAgaWYgKCF0ZXN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyB8fCAnYXNzZXJ0aW9uIGZhaWx1cmUnKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvZEFzc2VydCgpIHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXByZWNhdGUoZGVzYzogc3RyaW5nKSB7XG4gIGNvbnNvbGUud2FybihgREVQUkVDQVRJT046ICR7ZGVzY31gKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVidWdBc3NlcnQ7XG4iXSwic291cmNlUm9vdCI6IiJ9