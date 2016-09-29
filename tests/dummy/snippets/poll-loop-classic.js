  pollForChanges() {
    if (this.isDestroyed) { return; }
    pollServerForChanges().then(() => {
      Ember.run.later(this, 'pollForChanges', 5000);
    });
  }
