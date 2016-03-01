export function restartable() {
  return (taskProperty) => taskProperty.restartable();
}

export function drop() {
  return (taskProperty) => taskProperty.drop();
}

export function enqueue() {
  return (taskProperty) => taskProperty.enqueue();
}

export function maxConcurrency(n) {
  return (taskProperty) => taskProperty.maxConcurrency(n);
}

