export const CANCEL_KIND_EXPLICIT = "explicit";
export const CANCEL_KIND_YIELDABLE_CANCEL = "yielded";
export const CANCEL_KIND_LIFESPAN_END = "lifespan_end";
export const CANCEL_KIND_PARENT_CANCEL = "parent_cancel";

export class CancelRequest {
  constructor(kind, reason) {
    this.kind = kind;
    this.reason = reason;
  }
}
