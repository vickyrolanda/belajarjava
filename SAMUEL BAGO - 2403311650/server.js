const express = require('express');
const app = express();
const port = 3000;

const auth = require('./auth');
const system = require('./system');


app.use(express.json());
app.use(express.static('public'));

app.post('/api/proses-login', (req, res) => {
    const { username } = req.body;

    auth.loginUser(username)
        .then((pesanLogin) => {
            console.log("Tahap 1 Sukses:", pesanLogin);

            system.generateKey((error, keyBaru) => {
                if (error) {
                     return res.status(500).json({ sukses: false, pesan: "Gagal generate key" });
                }
                console.log("Tahap 2 Sukses, Key:", keyBaru);
                res.json({
                    sukses: true,
                    pesan: ">>> PESAN BERHASIL DARI ADMIN <<<",
                    detail: {
                        status_login: pesanLogin,
                        kunci_akses: keyBaru
                    }
                });
            });
        })
        .catch((errorLogin) => {
            console.log("Gagal:", errorLogin);
            res.json({ sukses: false, pesan: errorLogin });
        });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});