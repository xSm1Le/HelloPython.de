
const PAGES = [
  {
    icon: '💻',
    label: 'VS Code Guide',
    href: '/python-Grundlagen/html/vscode.html',
    badge: 'neu',
  },
  {
    icon: '⚙️',
    label: 'Syntax',
    href: '/python-Grundlagen/html/syntax.html',
    badge: 'neu',
  },
  {
    icon: '🔁',
    label: 'Schleifen',
    href: '/python-Grundlagen/html/schleifen.html',
    badge: 'neu',
  },
  {
    icon: '📦',
    label: 'Funktionen',
    href: '/python-Grundlagen/html/funktionen.html',
    badge: 'neu',
  },
  {
    icon: '🗂️',
    label: 'Datenstrukturen',
    href: '/python-Grundlagen/html/datenstrukturen.html',
    badge: 'neu',
  },
  {
    icon: '📐',
    label: 'OOP',
    href: '/python-Grundlagen/html/oop.html',
    badge: 'neu',
  },
  {
    icon: '🛡️',
    label: 'Fehlerbehandlung',
    href: '/python-Grundlagen/html/fehlerbehandlung.html',
    badge: 'neu',
  },
  {
    icon: '📦',
    label: 'Module & Pakete',
    href: '/python-Grundlagen/html/module_pakete.html',
    badge: 'neu',
  },
];

/*
  <a class="sidebar-link" href="#themen" data-section="themen">
    <span class="s-icon">🏗️</span> Praxisprojekte
    <span class="s-badge">neu</span>
  </a>
*/

const PAGES2 = [
  {
    icon: '✍️',
    label: 'Über Mich',
    href: '/python-Grundlagen/html/about.html',
    badge: 'neu',
  },
  {
    icon: '⚙️',
    label: 'Einstellungen',
    href: '/python-Grundlagen/html/syntax.html',
    badge: 'neu',
  },
  {
    icon: '👉',
    label: 'Projektunterstützung',
    href: '/python-Grundlagen/html/projekt.html',
    badge: 'Empfehlung',
  },
];

// SIDEBAR GENERIEREN
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const currentPath = window.location.pathname;

  // Divider
  const divider = document.createElement('div');
  divider.className = 'sidebar-divider';
  sidebar.appendChild(divider);

  // Label
  const label = document.createElement('div');
  label.className = 'sidebar-section-label';
  label.textContent = 'Weitere – Kapitel';
  sidebar.appendChild(label);

  // Links
  PAGES.forEach(function (page) {
    const isActive = currentPath.indexOf(page.href) !== -1;

    const a = document.createElement('a');
    a.className = 'sidebar-link' + (isActive ? ' active' : '');
    a.href = page.href;

    const iconSpan = document.createElement('span');
    iconSpan.className = 's-icon';
    iconSpan.textContent = page.icon;
    a.appendChild(iconSpan);

    a.appendChild(document.createTextNode(' ' + page.label));

    // Badge: "aktiv" wenn aktuelle Seite, sonst definiertes Badge
    if (isActive) {
      const badge = document.createElement('span');
      badge.className = 's-badge';
      badge.textContent = 'aktiv';
      a.appendChild(badge);
    } else if (page.badge) {
      const badge = document.createElement('span');
      badge.className = 's-badge';
      badge.textContent = page.badge;
      a.appendChild(badge);
    }

    sidebar.appendChild(a);
  });
  /** 
  const divider2 = document.createElement('div');
  divider2.className = 'sidebar-divider';
  sidebar.appendChild(divider2);

  const label2 = document.createElement('div');
  label2.className = 'sidebar-section-label';
  label2.textContent = 'Anderes';
  sidebar.appendChild(label2);

  PAGES2.forEach(function (page) {
    const isActive = currentPath.indexOf(page.href) !== -1;

    const a = document.createElement('a');
    a.className = 'sidebar-link' + (isActive ? ' active' : '');
    a.href = page.href;

    const iconSpan = document.createElement('span');
    iconSpan.className = 's-icon';
    iconSpan.textContent = page.icon;
    a.appendChild(iconSpan);

    a.appendChild(document.createTextNode(' ' + page.label));

    // Badge: "aktiv" wenn aktuelle Seite, sonst definiertes Badge
    if (isActive) {
      const badge = document.createElement('span');
      badge.className = 's-badge';
      badge.textContent = 'aktiv';
      a.appendChild(badge);
    } else if (page.badge) {
      const badge = document.createElement('span');
      badge.className = 's-badge';
      badge.textContent = page.badge;
      a.appendChild(badge);
    }

    sidebar.appendChild(a);
  });
  */
});