import { STARTED } from './execution-states';

class UnboundedReducer {
  step() {
    return STARTED;
  }
}

const SINGLETON_REDUCER = new UnboundedReducer();

class UnboundedPolicy {
  makeReducer() {
    return SINGLETON_REDUCER;
  }
}

export default UnboundedPolicy;
