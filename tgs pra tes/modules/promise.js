// modules/promise.js
function generateKey(){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      const key = Math.random().toString(36).slice(2,10).toUpperCase();
      resolve(key);
    }, 700);
  });
}
module.exports = generateKey;
