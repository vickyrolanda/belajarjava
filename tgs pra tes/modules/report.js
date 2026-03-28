// modules/report.js
function showReport(username, key){
  const now = new Date().toLocaleString();
  return `✅ Login berhasil! Selamat datang ${username}. KEY: ${key} (waktu: ${now})`;
}
module.exports = showReport;
