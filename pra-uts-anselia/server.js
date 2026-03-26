const express = require('express')
const path = require('path')


const app = express()
const PORT = process.env.PORT || 3001

function getTabungan(key) {
    return new Promise((success, reject) => {
        if (key) {
            setTimeout(() => {
                success("5.000.000");
            }, 2000);
        } else {
            reject('User tidak ditemukan');
        }
    });
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post(`/api/login`, async(req, res) => {
    const data = req.body || {}
    const tabungan = await getTabungan(data.key)

    if (!data.username) {
        return res.status(400).json({ message: 'Username salah' })
    }

    if (data.username === "admin" && data.key === "shanshan") {
        return res.status(200).json({ message: `penghasilan anda adalah: ${tabungan}  ` })
    }

    return res.status(500).json({ message: "error" })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})