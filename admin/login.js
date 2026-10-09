// Logowanie przez przekierowanie (okno popup nie działa przy nagłówku COOP same-origin).
(function () {
  var hash = location.hash || '';
  var m = hash.match(/token=([^&]+)/);
  var err = hash.match(/error=([^&]+)/);
  if (m) {
    try {
      localStorage.setItem('decap-cms-user', JSON.stringify({ token: decodeURIComponent(m[1]), backendName: 'github' }));
    } catch (e) {}
    history.replaceState(null, '', '/admin/');
    location.replace('/admin/cms.html');
    return;
  }
  if (err) document.getElementById('msg').textContent = 'Logowanie nie powiodło się: ' + decodeURIComponent(err[1]);
  try {
    if (localStorage.getItem('decap-cms-user')) location.replace('/admin/cms.html');
  } catch (e) {}
})();
