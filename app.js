import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;


    if (username === "admin" && password === "12345") {
        res.send("<h1>Login berhasil! Selamat datang, Admin ✅</h1>");
    } else {
        res.send("<h1 style='color:red;'>Login gagal ❌, username atau password salah.</h1>");
    }
});

app.listen(3000, () => {
    console.log("Server berjalan di http://localhost:3000");
});
