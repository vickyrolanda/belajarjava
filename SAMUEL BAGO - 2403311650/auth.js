
module.exports = {
    loginUser: function(username) {
        console.log("[Promise] Memulai proses login...");
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === 'admin') {
                    resolve("Login Berhasil"); 
                } else {
                    reject("Username salah!"); 
                }
            }, 500);
        });
    }
};