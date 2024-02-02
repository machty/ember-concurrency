class BoundedPolicy {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency || 1;
  }
}

export default BoundedPolicy;
