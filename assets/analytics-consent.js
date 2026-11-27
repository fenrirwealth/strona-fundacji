(function () {
  'use strict';
  if (location.hostname !== 'fundacjalepszydomlepszejutro.pl' || document.getElementById('fundacja-privacy')) return;
  if (/^\/(admin|api)(\/|$)/.test(location.pathname)) return;
  var KEY = 'fundacja_privacy_v1', AGE = 180 * 86400000;
  var choice = null, lastPath = null;
  function readChoice() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY));
      return saved && saved.version === 1 && ['accepted', 'rejected'].includes(saved.choice) && saved.expires > Date.now() ? saved.choice : null;
    } catch (_) { return null; }
  }
  choice = readChoice();
  var panel = document.createElement('section');
  panel.id = 'fundacja-privacy';
  panel.setAttribute('role', 'region');
  panel.setAttribute('aria-labelledby', 'fundacja-privacy-title');
  panel.innerHTML = '<h2 id="fundacja-privacy-title">Twoja prywatność</h2><p>Za Twoją zgodą zliczamy odwiedziny w naszym systemie Umami, aby ulepszać stronę Fundacji. Nie używamy reklamowych cookies ani nie nagrywamy sesji. Odmowa nie ogranicza korzystania ze strony.</p><a href="/polityka-prywatnosci">Polityka prywatności</a><div class="privacy-actions"><button type="button" data-choice="rejected">Odrzuć statystyki</button><button type="button" data-choice="accepted">Zgadzam się na statystyki</button></div>';
  document.body.appendChild(panel);
  var settings = document.createElement('button');
  settings.type = 'button';
  settings.id = 'fundacja-privacy-settings';
  settings.textContent = 'Ustawienia prywatności';
  settings.setAttribute('aria-controls', panel.id);
  settings.setAttribute('aria-expanded', String(!choice));
  document.body.appendChild(settings);
  function show(open) {
    panel.hidden = !open;
    settings.setAttribute('aria-expanded', String(open));
  }
  function track() {
    if (choice !== 'accepted' || navigator.doNotTrack === '1' || navigator.globalPrivacyControl === true) return;
    var path = location.pathname;
    if (/^\/(admin|api|newsletter|dziekujemy)(\/|$)/.test(path) || lastPath === path) return;
    lastPath = path;
    var referrer = '';
    try { referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch (_) {}
    fetch('https://statystyki.novasushi.com.pl/api/send', {
      method: 'POST', credentials: 'omit', referrerPolicy: 'no-referrer', keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({type: 'event', payload: {
        website: 'f35da478-aff5-448b-8965-aad19c484e7c',
        hostname: location.hostname, url: path, referrer: referrer,
        language: navigator.language, tag: 'fundacja-consented-v1'
      }})
    }).catch(function () {});
  }
  panel.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-choice]');
    if (!button) return;
    choice = button.dataset.choice;
    try { localStorage.setItem(KEY, JSON.stringify({version: 1, choice: choice, expires: Date.now() + AGE})); } catch (_) {}
    show(false);
    if (choice === 'accepted') { lastPath = null; track(); }
    settings.focus({preventScroll: true});
  });
  settings.addEventListener('click', function () { show(panel.hidden); });
  window.addEventListener('storage', function (event) {
    if (event.key !== KEY && event.key !== null) return;
    choice = readChoice(); show(!choice);
  });
  window.addEventListener('popstate', track);
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    history[method] = function () {
      var result = original.apply(this, arguments);
      track();
      return result;
    };
  });
  show(!choice);
  track();
})();
