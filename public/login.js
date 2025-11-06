document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const resultDiv = document.getElementById('result');
    const consoleDiv = document.getElementById('console');
    
    // Reset
    resultDiv.innerHTML = "⏳ Memproses login...";
    resultDiv.className = "result loading";
    consoleDiv.innerHTML = "🔐 Memulai proses login...<br>";
    
    try {
        // Kirim request ke server Express
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            consoleDiv.innerHTML += "✅ " + data.message + "<br>";
            consoleDiv.innerHTML += "🔑 Generate key dalam proses...<br>";
            
            // Simulasi delay untuk proses callback
            setTimeout(() => {
                consoleDiv.innerHTML += "✅ Key berhasil digenerate: " + data.key + "<br>";
                consoleDiv.innerHTML += "📊 Menampilkan laporan...<br>";
                
                resultDiv.innerHTML = "🎉 " + data.laporan;
                resultDiv.className = "result success";
                
                consoleDiv.innerHTML += "✅ Semua proses selesai!<br>";
            }, 1000);
            
        } else {
            resultDiv.innerHTML = "❌ " + data.message;
            resultDiv.className = "result error";
            consoleDiv.innerHTML += "❌ Login gagal: " + data.message + "<br>";
        }
        
    } catch (error) {
        resultDiv.innerHTML = "❌ Error: " + error.message;
        resultDiv.className = "result error";
        consoleDiv.innerHTML += "❌ Error: " + error.message + "<br>";
    }
});