const form = document.getElementById('login')
const message = document.getElementById('info')

function setMessage(text, type = "information") {
    message.textContent = text
    message.className = type
    message.classList.add('message', type)
}

form.addEventListener("submit", async(e) => {
    e.preventDefault()


    setMessage("Memproses..", 'information')

    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    const length = 5
    const keyGenerate = { key: '' }

    function generateKey() {
        const pass = "shanshan"
        return pass;
    }

    data.key = generateKey()

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        setMessage(result.message, response.ok ? 'success' : 'error')
    } catch (error) {
        setMessage("Terjadi kesalahan. silahkan coba lagi", 'error')
    }
})