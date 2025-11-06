const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware untuk serve file static
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route untuk halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint untuk login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Import modul
        const authModule = require('./modules/authModule');
        
        // Verifikasi login menggunakan Promise
        const loginResult = await authModule.verifyLogin(username, password);
        
        // Jika login berhasil, generate key menggunakan Callback
        authModule.generateKey((key) => {
            // Tampilkan laporan
            const laporan = authModule.tampilkanLaporan(key);
            
            res.json({
                success: true,
                message: loginResult.message,
                laporan: laporan,
                key: key
            });
        });
        
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`📁 Static files diserve dari folder: ${path.join(__dirname, 'public')}`);
});

// Handle uncaught errors
process.on('uncaughtException', (err) => {
    console.error('❌ Ada error:', err);
});