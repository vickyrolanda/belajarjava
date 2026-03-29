const loginForm = document.getElementById('loginForm');
const afterLogin = document.getElementById('afterLogin');
const statusP = document.getElementById('status');
const sendReportBtn = document.getElementById('sendReport');
const logoutBtn = document.getElementById('logoutBtn');

let currentKey = null;

function showStatus(text) {
  statusP.textContent = text;
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username) return showStatus('Masukkan username');
  if (!password) return showStatus('Masukkan password');

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(r => r.json())
  .then(data => {
    if (!data.ok) {
      showStatus(data.message || 'Login gagal');
      return;
    }

    currentKey = data.key;
    showStatus('Login berhasil. Key diterima.');
    afterLogin.style.display = 'block';
    loginForm.style.display = 'none';
  })
  .catch(err => {
    showStatus('Terjadi error: ' + err.message);
  });
});

sendReportBtn.addEventListener('click', () => {
  const message = document.getElementById('reportMsg').value.trim();
  if (!currentKey) return alert('Tidak ada key. Login terlebih dahulu.');

  fetch('/report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: currentKey, message })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) alert(data.message);
    else alert(data.message || 'Gagal mengirim laporan');
  })
  .catch(err => alert('Error: ' + err.message));
});

logoutBtn.addEventListener('click', () => {
  if (!currentKey) return resetToLogin();

  fetch('/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: currentKey })
  })
  .then(r => r.json())
  .then(data => {
    alert(data.message || 'Logout selesai');
    resetToLogin();
  })
  .catch(err => {
    alert('Error saat logout: ' + err.message);
    resetToLogin();
  });
});

function resetToLogin() {
  currentKey = null;
  document.getElementById('reportMsg').value = '';
  afterLogin.style.display = 'none';
  loginForm.style.display = 'block';
  showStatus('');
}