  @task *pollForChanges() {
    while(true) {
      yield pollServerForChanges();
      if (Ember.testing) { return; }
      yield timeout(5000);
    }
  }
