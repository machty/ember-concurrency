  pollForChanges = task(async () => {
    while(true) {
      yield pollServerForChanges();
      yield timeout(5000);
    }
  })
