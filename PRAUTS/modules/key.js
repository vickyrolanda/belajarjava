const crypto = require('crypto');
const keys = new Map();


function generateKey(username) {
return new Promise((resolve, reject) => {
try {
setTimeout(() => {
const raw = `${username}-${Date.now()}-${Math.random()}`;
const key = crypto.createHash('sha256').update(raw).digest('hex');
keys.set(key, { username, created: Date.now() });
resolve(key);
}, 200);
} catch (e) {
reject(e);
}
});
}


function verifyKey(key) {
return new Promise((resolve) => {
setTimeout(() => {
resolve(keys.has(key));
}, 100);
});
}


function revokeKey(key) {
return new Promise((resolve) => {
setTimeout(() => {
const existed = keys.delete(key);
resolve(existed);
}, 100);
});
}


module.exports = { generateKey, verifyKey, revokeKey };