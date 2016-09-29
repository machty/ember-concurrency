  pollForChanges: task(function * () {
    while(true) {
      yield pollServerForChanges();
      yield timeout(5000);
    }
  })
