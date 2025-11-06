// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk JSON
app.use(express.json());

// Arahkan folder public (untuk index.html, app.js, dll)
app.use(express.static(path.join(__dirname, "public")));

// Data login demo
const DEMO_USER = {
  username: "admin@gmail.com",
  password: "password123",
};

// Endpoint API login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Username dan password diperlukan" });
  }

  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    return res.json({ message: "Login berhasil!" });
  } else {
    return res.status(401).json({ message: "Username atau password salah" });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
