"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Note: `MakeRemoteType` fails in a known case of functions that return further functions (this is also captured
// in the tests for this module). The following is a simpler reproduction of the issue:
//
//   type ID<T> = T extends () => infer U ? () => ID<U> : T;
//
// When given a function type, ID<T> should act as the identity, returning the original by structural recursion on
// the given function. `ID<() => number>` correctly results in `() => number`, but `ID<() => () => number>` gives
// `() => any`.
