const express = require('express');
const path = require('path');

const checkUsername = require('./modules/callback'); // callback
const generateKey = require('./modules/promise');    // promise
const showReport = require('./modules/report');      // report module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// login endpoint: hanya cek username === 'admin', password bebas (system doesn't validate password)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};

  checkUsername(username, (err, ok) => {
    if (err) return res.status(401).json({ message: String(err) });

    // jika username valid, generate key (Promise)
    generateKey().then(key => {
      const report = showReport(username, key);
      return res.json({ message: report, key });
    }).catch(e => {
      console.error('Generate key error', e);
      return res.status(500).json({ message: 'Gagal menghasilkan key' });
    });
  });
});

// fallback safe for Express 5
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`✅ Server berjalan di http://localhost:${PORT}`));
