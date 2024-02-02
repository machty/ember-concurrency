const WORDS = ['ember', 'tomster', 'swag', 'yolo', 'turbo', 'ajax'];
export function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}
