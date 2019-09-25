/* eslint-disable no-undef */

declare module 'qunit' {
  export const module: typeof QUnit.module;
  export const test: typeof QUnit.test;
  export const skip: typeof QUnit.skip;
  export const only: typeof QUnit.only;
  export const todo: typeof QUnit.todo;

  export default QUnit;
}
