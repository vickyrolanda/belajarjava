export function generateKey(callback) {
  setTimeout(() => {
    const key = "KEY-" + Math.random().toString(36).substring(2, 10);
    callback(null, key);
  }, 500);
}
