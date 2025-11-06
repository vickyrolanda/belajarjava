// MODUL SYSTEM: Laporan Admin
function showReport(username, key) {
  const income = 12500000; // contoh penghasilan admin
  return `
    <div class="report-card">
      <h2>Laporan Admin</h2>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Key Akses:</strong> ${key}</p>
      <p><strong>Penghasilan:</strong> Rp ${income.toLocaleString("id-ID")}</p>
    </div>
  `;
}
module.exports = showReport;