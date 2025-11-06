// PROMISE: Generate security key
function generateKey() {
  return new Promise((resolve, reject) => {
    console.log("Membuat key keamanan...");
    setTimeout(() => {
      const key = Math.random().toString(36).substring(2, 10).toUpperCase();
      if (key) resolve(key);
      else reject("Gagal membuat key!");
    }, 1000);
  });
}
module.exports = generateKey;