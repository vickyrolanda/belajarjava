const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const auth = require('./modules/callback');
const keygen = require('./modules/key');


const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
const { username, password } = req.body;

auth.checkUser(username, password, (err, status) => {
if (err) return res.status(500).json({ ok: false, error: 'Server error' });


if (status === 'no_user') return res.status(401).json({ ok: false, message: 'Username salah' });
if (status === 'wrong_password') return res.status(401).json({ ok: false, message: 'Password salah' });


keygen.generateKey(username)
.then(key => res.json({ ok: true, key }))
.catch(e => res.status(500).json({ ok: false, error: 'Gagal membuat key' }));
});
});


app.post('/report', (req, res) => {
const { key, message } = req.body;
if (!key) return res.status(400).json({ ok: false, message: 'Key dibutuhkan' });


keygen.verifyKey(key)
.then(isValid => {
if (!isValid) return res.status(401).json({ ok: false, message: 'Key tidak valid' });


console.log('Laporan diterima dari admin:', message);
res.json({ ok: true, message: 'Laporan pesan berhasil dari admin' });
})
.catch(err => res.status(500).json({ ok: false, error: 'Verifikasi key gagal' }));
});


app.post('/logout', (req, res) => {
const { key } = req.body;
if (!key) return res.status(400).json({ ok: false, message: 'Key dibutuhkan' });


keygen.revokeKey(key)
.then(revoked => {
if (!revoked) return res.status(400).json({ ok: false, message: 'Key tidak ditemukan atau sudah dicabut' });
res.json({ ok: true, message: 'Logout berhasil' });
})
.catch(err => res.status(500).json({ ok: false, error: 'Gagal melakukan logout' }));
});


app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));