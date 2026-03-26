async function jalankanProses() {
    const username = document.getElementById('usernameInput').value;
    const outputDiv = document.getElementById('hasilLaporan');
    const outputTeks = document.getElementById('outputTeks');
    const loading = document.getElementById('loadingBar');

    
    outputDiv.classList.remove('hidden');
    outputTeks.textContent = '';
    loading.classList.remove('hidden');

    try {
        const response = await fetch('/api/proses-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username })
        });

        const data = await response.json();

        loading.classList.add('hidden');
        if (data.sukses) {
            outputDiv.style.borderLeftColor = '#28a745'; // Hijau jika sukses
            outputTeks.textContent = `STATUS: ${data.pesan}\n\n[Detail Proses]\nLogin: ${data.detail.status_login}\nKey Generated: ${data.detail.kunci_akses}`;
        } else {
            outputDiv.style.borderLeftColor = '#dc3545'; // Merah jika gagal
            outputTeks.textContent = `GAGAL: ${data.pesan}`;
        }

    } catch (error) {
        loading.classList.add('hidden');
        outputTeks.textContent = "Error koneksi ke server Node.js";
    }
}