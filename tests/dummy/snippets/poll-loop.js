  @task *pollForChanges() {
    while(true) {
      yield pollServerForChanges();
      yield timeout(5000);
    }
  }
