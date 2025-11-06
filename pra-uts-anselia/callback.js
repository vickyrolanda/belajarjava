const token = ~~[Math.random() * 10].toString(16);
const tabungan = [5000000];

function login(user, callback) {
    console.log('Login berhasil');
    setTimeout(() => {
        callback({ token, user });
    }, 2000);
}

function getUser(token) {
    if (token) {
        return { key: "SHANSHAN" };
    }
}

function getTabungan(user, callback) {
    if (user) {
        setTimeout(() => {
            callback(tabungan);
        }, 2000);
    }
}

function getSaldo(tabungan, callback) {
    if (tabungan) {
        setTimeout(() => {
            let total = 0;
            tabungan.forEach((item) => {
                total += item;
            });
            callback(total);
        }, 2000);
    } else {
        callback(0);
    }
}

const user = login("Anselia", function(response) {
    const key = getUser(response.token);
    console.log(key);
    getTabungan(response.user, function(tabungan) {
        console.log(tabungan);
        getSaldo(tabungan, function(saldo) {
            console.log(saldo);
        });
    });
});