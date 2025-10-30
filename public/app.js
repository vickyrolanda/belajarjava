const from = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

function setMessage(text, type =  'info') {
    messageBox.textContent = text;
    messageBox.className = type;
    messageBox.classList.add('message',type);
}

from.addEventListener("submit", async (Event) =>{
    Event.preventDefault();

    setMessage("Memproses...", 'info');

    const formData = new FormData(from);
    const data = Object.fromEntries(formData.entries());

    try{
        const responen = await fetch("/api/login",{
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await responen.json();
        setMessage(result.message, response.ok ? 'succes' : 'error');
    }catch (error) {
        setMessage("terjadi kesalahan. Silahkan coba lagi.", 'error');
    }
})