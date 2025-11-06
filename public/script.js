var CURRENT_KEY = null;

function showStatus(t){
  var s = document.getElementById('status');
  if (s) { s.textContent = t || ""; }
}

function doLogin(ev){
  if (ev && ev.preventDefault) ev.preventDefault();
  var u = document.getElementById('username').value;
  var p = document.getElementById('password').value;
  if (!u || !p) {
    alert("Isi username & password dulu lah");
    return false;
  }
  
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      try {
        var resp = JSON.parse(xhr.responseText || "{}");
        if (resp.ok) {
          CURRENT_KEY = resp.key;
          document.getElementById('loginForm').style.display = "none";
          document.getElementById('afterLogin').style.display = "block";
          showStatus("Login sukses (amatir)");
        } else {
          alert(resp.message || "login gagal (amatir)");
          showStatus("Login gagal");
        }
      } catch(e) {
        alert("Error parsing response (amatir)");
      }
    }
  };
  xhr.send("username=" + encodeURIComponent(u) + "&password=" + encodeURIComponent(p));
  return false;
}

function kirimLaporan(){
  var msg = document.getElementById('reportMsg').value;
  if (!msg) {
    alert("Isi pesan laporan dulu");
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/report", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      try {
        var resp = JSON.parse(xhr.responseText || "{}");
        if (resp.ok) {
          alert("Laporan terkirim (amatir)");
          showStatus("Laporan oke");
          document.getElementById('reportMsg').value = "";
        } else {
          alert(resp.message || "gagal kirim (amatir)");
        }
      } catch(e) {
        alert("Respon aneh (amatir)");
      }
    }
  };
  xhr.send("key=" + encodeURIComponent(CURRENT_KEY||"") + "&msg=" + encodeURIComponent(msg));
}

function keluar(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/logout", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4) {
      try {
        var resp = JSON.parse(xhr.responseText || "{}");
        if (resp.ok) {
          CURRENT_KEY = null;
          document.getElementById('afterLogin').style.display = "none";
          document.getElementById('loginForm').style.display = "block";
          showStatus("Sudah logout (amatir)");
        } else {
          alert(resp.message || "gagal logout (amatir)");
        }
      } catch(e) {
        alert("Respon error (amatir)");
      }
    }
  };
  xhr.send("key=" + encodeURIComponent(CURRENT_KEY||""));
}
