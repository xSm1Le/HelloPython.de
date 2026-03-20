
// ZENTRALE SEITENLISTE – hier alles verwalten
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


(function () {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const currentPath = window.location.pathname;

  const divider = document.createElement('div');
  divider.className = 'sidebar-divider';

  const label = document.createElement('div');
  label.className = 'sidebar-section-label';
  label.textContent = 'Weitere – Kapitel';

  sidebar.appendChild(divider);
  sidebar.appendChild(label);

  PAGES.forEach(page => {
    const isActive = currentPath.endsWith(page.href) || currentPath === page.href;

    const a = document.createElement('a');
    a.className = 'sidebar-link' + (isActive ? ' active' : '');
    a.href = page.href;

    const iconSpan = document.createElement('span');
    iconSpan.className = 's-icon';
    iconSpan.textContent = page.icon;
    a.appendChild(iconSpan);

    a.appendChild(document.createTextNode(' ' + page.label));

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
})();