  async pollForChanges() {
    if (this.isDestroyed) { return; }
    await pollServerForChanges();
    run.later(this, 'pollForChanges', 5000);
  }
