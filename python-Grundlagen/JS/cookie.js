(function () {
  const COOKIE_KEY = 'hp_consent';

  function getConsent() {
    try { return JSON.parse(localStorage.getItem(COOKIE_KEY)); } catch { return null; }
  }

  function saveConsent(obj) {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...obj, date: new Date().toISOString() }));
  }

  function loadAnalytics() {
    if (document.getElementById('ga-script')) return;
    var s = document.createElement('script');
    s.id = 'ga-script';
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-GFSQG3CG7S';
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-GFSQG3CG7S', { anonymize_ip: true });
  }

  function applyConsent(consent) {
    if (consent.analytics) loadAnalytics();
  }

  function hideBanner() {
    var banner = document.getElementById('hp-cookie-banner');
    if (banner) banner.style.transform = 'translateY(120%)';
  }

  function injectStyles() {
    if (document.getElementById('hp-cookie-styles')) return;
    var style = document.createElement('style');
    style.id = 'hp-cookie-styles';
    style.textContent = `
      #hp-cookie-banner {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        z-index: 9999;
        background: #141414;
        border-top: 1px solid #222;
        padding: 1.25rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        flex-wrap: wrap;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.82rem;
        color: #999;
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 -4px 24px rgba(0,0,0,0.4);
      }
      #hp-cookie-banner.visible { transform: translateY(0); }
      #hp-cookie-banner .cb-text { flex: 1; min-width: 260px; line-height: 1.7; }
      #hp-cookie-banner .cb-text a { color: #4ade80; text-decoration: none; }
      #hp-cookie-banner .cb-text a:hover { text-decoration: underline; }
      #hp-cookie-banner .cb-text strong { color: #e5e5e5; }
      #hp-cookie-banner .cb-buttons { display: flex; gap: 0.75rem; flex-shrink: 0; flex-wrap: wrap; }
      #hp-cookie-banner button {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        padding: 0.55rem 1.25rem;
        border-radius: 6px;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s;
        white-space: nowrap;
      }
      #hp-btn-accept { background: #4ade80; color: #0d0d0d; font-weight: 700; border-color: #4ade80; }
      #hp-btn-accept:hover { background: #22c55e; border-color: #22c55e; }
      #hp-btn-decline { background: transparent; color: #666; border-color: #333; }
      #hp-btn-decline:hover { color: #e5e5e5; border-color: #555; }
      #hp-btn-settings { background: transparent; color: #555; border: none; text-decoration: underline; padding: 0.55rem 0.5rem; cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }
      #hp-btn-settings:hover { color: #999; }

      #hp-cookie-modal {
        display: none; position: fixed; inset: 0; z-index: 10000;
        background: rgba(0,0,0,0.75);
        align-items: center; justify-content: center; padding: 1rem;
        font-family: 'JetBrains Mono', monospace;
      }
      #hp-cookie-modal.open { display: flex; }
      #hp-modal-box {
        background: #141414; border: 1px solid #2a2a2a;
        border-radius: 10px; padding: 2rem;
        max-width: 500px; width: 100%; color: #e5e5e5;
      }
      #hp-modal-box h3 { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; color: #fff; margin: 0 0 0.4rem; }
      #hp-modal-box > p { font-size: 0.8rem; color: #666; margin: 0 0 1.5rem; line-height: 1.7; }
      .cb-option { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding: 0.9rem 0; border-bottom: 1px solid #1e1e1e; }
      .cb-option:last-of-type { border-bottom: none; }
      .cb-option-info strong { display: block; font-size: 0.85rem; color: #e5e5e5; margin-bottom: 0.2rem; }
      .cb-option-info span { font-size: 0.75rem; color: #555; line-height: 1.6; }
      .cb-toggle { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
      .cb-toggle input { opacity: 0; width: 0; height: 0; }
      .cb-slider { position: absolute; inset: 0; background: #2a2a2a; border-radius: 22px; cursor: pointer; transition: background 0.2s; }
      .cb-slider::before { content: ''; position: absolute; width: 16px; height: 16px; left: 3px; top: 3px; background: #555; border-radius: 50%; transition: transform 0.2s, background 0.2s; }
      .cb-toggle input:checked + .cb-slider { background: #16a34a; }
      .cb-toggle input:checked + .cb-slider::before { transform: translateX(18px); background: #4ade80; }
      .cb-toggle input:disabled + .cb-slider { cursor: not-allowed; opacity: 0.5; }
      .cb-modal-buttons { display: flex; gap: 0.75rem; margin-top: 1.5rem; justify-content: flex-end; }
      .cb-modal-buttons button { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; padding: 0.55rem 1.1rem; border-radius: 6px; cursor: pointer; border: 1px solid transparent; transition: all 0.2s; }
      #hp-modal-save { background: #4ade80; color: #0d0d0d; font-weight: 700; border-color: #4ade80; }
      #hp-modal-save:hover { background: #22c55e; }
      #hp-modal-cancel { background: transparent; color: #666; border-color: #333; }
      #hp-modal-cancel:hover { color: #e5e5e5; border-color: #555; }
      @media (max-width: 600px) {
        #hp-cookie-banner { flex-direction: column; align-items: flex-start; padding: 1.25rem; }
        #hp-cookie-banner .cb-buttons { width: 100%; }
        #hp-btn-accept, #hp-btn-decline { flex: 1; text-align: center; }
      }
    `;
    document.head.appendChild(style);
  }

  function injectBanner() {
    if (document.getElementById('hp-cookie-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'hp-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <div class="cb-text">
        <strong>🍪 Diese Website verwendet Cookies</strong><br>
        Wir nutzen Cookies für Analyse und Google Fonts. Mehr dazu in unserer
        <a href="/datenschutz.html">Datenschutzerklärung</a>.
      </div>
      <div class="cb-buttons">
        <button id="hp-btn-settings">Einstellungen</button>
        <button id="hp-btn-decline">Ablehnen</button>
        <button id="hp-btn-accept">Alle akzeptieren</button>
      </div>
    `;

    var modal = document.createElement('div');
    modal.id = 'hp-cookie-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div id="hp-modal-box">
        <h3>Cookie-Einstellungen</h3>
        <p>Wähle welche Cookies du erlaubst. Notwendige Cookies sind immer aktiv.</p>
        <div class="cb-option">
          <div class="cb-option-info">
            <strong>Notwendig</strong>
            <span>Technisch erforderlich für den Betrieb der Seite.</span>
          </div>
          <label class="cb-toggle">
            <input type="checkbox" checked disabled>
            <span class="cb-slider"></span>
          </label>
        </div>
        <div class="cb-option">
          <div class="cb-option-info">
            <strong>Google Fonts</strong>
            <span>Schriften werden von Google-Servern geladen.</span>
          </div>
          <label class="cb-toggle">
            <input type="checkbox" id="hp-toggle-fonts">
            <span class="cb-slider"></span>
          </label>
        </div>
        <div class="cb-option">
          <div class="cb-option-info">
            <strong>Google Analytics</strong>
            <span>Anonymisierte Analyse des Nutzerverhaltens.</span>
          </div>
          <label class="cb-toggle">
            <input type="checkbox" id="hp-toggle-analytics">
            <span class="cb-slider"></span>
          </label>
        </div>
        <div class="cb-modal-buttons">
          <button id="hp-modal-cancel">Abbrechen</button>
          <button id="hp-modal-save">Auswahl speichern</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    document.body.appendChild(modal);

    // Events
    document.getElementById('hp-btn-accept').addEventListener('click', function () {
      saveConsent({ necessary: true, fonts: true, analytics: true });
      applyConsent({ analytics: true });
      hideBanner();
    });

    document.getElementById('hp-btn-decline').addEventListener('click', function () {
      saveConsent({ necessary: true, fonts: false, analytics: false });
      hideBanner();
    });

    document.getElementById('hp-btn-settings').addEventListener('click', function () {
      var consent = getConsent();
      if (consent) {
        document.getElementById('hp-toggle-fonts').checked = !!consent.fonts;
        document.getElementById('hp-toggle-analytics').checked = !!consent.analytics;
      }
      modal.classList.add('open');
    });

    document.getElementById('hp-modal-cancel').addEventListener('click', function () {
      modal.classList.remove('open');
    });

    document.getElementById('hp-modal-save').addEventListener('click', function () {
      var consent = {
        necessary: true,
        fonts: document.getElementById('hp-toggle-fonts').checked,
        analytics: document.getElementById('hp-toggle-analytics').checked
      };
      saveConsent(consent);
      applyConsent(consent);
      modal.classList.remove('open');
      hideBanner();
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.classList.remove('open');
    });

    // Banner einblenden
    setTimeout(function () {
      banner.classList.add('visible');
    }, 400);
  }

  // Init
  var existing = getConsent();
  if (existing) {
    applyConsent(existing);
  } else {
    injectStyles();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectBanner);
    } else {
      injectBanner();
    }
  }

  window.openCookieSettings = function () {
  var banner = document.getElementById('hp-cookie-banner');
  var modal = document.getElementById('hp-cookie-modal');
  if (!banner || !modal) {
    injectStyles();
    injectBanner();
  }
  setTimeout(function () {
    document.getElementById('hp-cookie-modal').classList.add('open');
  }, 100);
};
})();