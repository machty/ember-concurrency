export function assert(description: string, test: any) {
  if (!test) {
    throw new Error('Assertion Failed: ' + description);
  }
}
