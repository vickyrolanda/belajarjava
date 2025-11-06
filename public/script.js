document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const output = document.getElementById("output");
  output.innerHTML = "<p>Sedang memeriksa...</p>";

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    output.innerHTML = res.ok ? data.report : `<p style='color:red;'>${data.message}</p>`;
  } catch (error) {
    output.innerHTML = "<p style='color:red;'>Terjadi kesalahan koneksi.</p>";
  }
});