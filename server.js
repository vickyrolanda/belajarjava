var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var PORT = 3000;

var USER = "admin";
var PASS = "admin123";

var LAST_KEY = null;
var LAST_USER = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function makeKey(u) {
  return (u + "_" + Date.now() + "_" + Math.random()).replace(/\W+/g, "");
}

app.post('/login', function(req, res){
  var u = (req.body && req.body.username) ? (""+req.body.username) : "";
  var p = (req.body && req.body.password) ? (""+req.body.password) : "";
  setTimeout(function(){
    if (u === USER && p === PASS) {
      LAST_USER = u;
      LAST_KEY = makeKey(u);
      res.json({ ok:true, key: LAST_KEY, message:"login ok ()" });
    } else {
      res.json({ ok:false, message:"username/password salah ()" });
    }
  }, 200);
});

app.post('/report', function(req, res){
  var k = (req.body && req.body.key) ? (""+req.body.key) : "";
  var m = (req.body && req.body.msg) ? (""+req.body.msg) : "";
  if (!k || !m) {
    return res.json({ ok:false, message:"key / msg kosong ()" });
  }
  if (k !== LAST_KEY) {
    return res.json({ ok:false, message:"key tidak valid ()" });
  }
  console.log("LAPORAN DARI", LAST_USER, ":", m);
  res.json({ ok:true, message:"laporan diterima ()" });
});
 
app.post('/logout', function(req, res){
  var k = (req.body && req.body.key) ? (""+req.body.key) : "";
  if (k && k === LAST_KEY) {
    LAST_KEY = null;
    LAST_USER = null;
    return res.json({ ok:true, message:"logout ok ()" });
  } else {
    return res.json({ ok:false, message:"key salah / sudah logout ()" });
  }
});

app.listen(PORT, function(){
  console.log("Server berjalan di http://localhost:"+PORT);
});
