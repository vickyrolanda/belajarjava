const express = require('express');
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
const DEMO_USER = {
    username: "admin@gmail.com",
    password: "password1234"
}

app.post('/api/login', (req, res) => {
    const {username, password} = req.body || {};

    if(!username||!password) {
        return res.status(400).json({message: "username dan password di perlukan"});
    }

    if(username === DEMO_USER.username && password === DEMO_USER.password) {
        return res.status(200).json({message: "Login Berhasil"});
    }

    return res.status(401).json({message: "Username atau password salah"});
});

app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.listen(port, () => {
    console.log(`server berjalan di http://localhost:${port}`);
});
