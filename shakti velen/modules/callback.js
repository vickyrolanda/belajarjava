const validUser = {
username: 'admin123',
password: 'password321'
};


function checkUser(username, password, cb) {
setTimeout(() => {
if (!username) return cb(null, 'no_user');
if (username !== validUser.username) return cb(null, 'no_user');
if (password !== validUser.password) return cb(null, 'wrong_password');
cb(null, 'ok');
}, 300);
}


module.exports = { checkUser };