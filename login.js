// CALLBACK: Login function
function login(username, callback) {
  console.log("Memeriksa username...");
  setTimeout(() => {
    if (username === "admin") {
      console.log("Login berhasil sebagai admin.");
      callback(null, true);
    } else {
      callback("Username salah! Gunakan 'admin'.", false);
    }
  }, 1000);
}
module.exports = login;