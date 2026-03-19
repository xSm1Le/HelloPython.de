fetch('/cookie-banner.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('cookie-root').innerHTML = html;
    });