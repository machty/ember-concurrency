import { STARTED } from "./desired-states";

class UnboundedReducer {
  step() {
    return STARTED;
  }
}

const SINGLETON_REDUCER = new UnboundedReducer();

class UnboundedPolicy extends SchedulerPolicy {
  makeReducer() {
    return SINGLETON_REDUCER;
  }
}

export default UnboundedPolicy;
