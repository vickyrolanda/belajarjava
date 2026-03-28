// modules/callback.js
// Memeriksa hanya username (identitas admin). Password tidak divalidasi — sesuai permintaan dosen.
function checkUsername(username, callback) {
  console.log('[module:callback] Memeriksa username:', username);
  setTimeout(()=>{
    if (!username) return callback('Username kosong!', null);
    if (username === 'admin') return callback(null, true);
    return callback('Username salah! (harus "admin")', null);
  }, 500);
}
module.exports = checkUsername;
