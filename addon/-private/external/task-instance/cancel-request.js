export const CANCEL_KIND_EXPLICIT = "explicit";
export const CANCEL_KIND_YIELDED = "yielded";
export const CANCEL_KIND_LIFESPAN_END = "lifespan_end";

export class CancelRequest {
  constructor(kind, reason) {
    this.kind = kind;
    this.reason = reason;
  }
}
