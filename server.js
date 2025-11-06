const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Import modul
const login = require("./login");
const generateKey = require("./generateKey");
const showReport = require("./report");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Endpoint login
app.post("/api/login", async (req, res) => {
  const { username } = req.body;

  login(username, async (err, success) => {
    if (err) return res.status(400).json({ message: err });

    try {
      const key = await generateKey();
      const report = showReport(username, key);
      res.json({ report });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  });
});

app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);