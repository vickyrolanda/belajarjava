module.exports = {

    generateKey: function(done) {
        console.log("[Callback] Sedang membuat key...");
        setTimeout(() => {
            const key = "KEY-SERVER-" + Math.floor(Math.random() * 9999);
            done(null, key);
        }, 500);
    }
};