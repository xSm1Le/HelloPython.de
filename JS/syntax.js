 // Hamburger
  const hamburgerBtn    = document.getElementById('hamburgerBtn');
  const sidebar         = document.getElementById('sidebar');
  const sidebarOverlay  = document.getElementById('sidebarOverlay');

  function toggleSidebar() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('open');
  }

  hamburgerBtn.addEventListener('click', toggleSidebar);
  sidebarOverlay.addEventListener('click', toggleSidebar);

  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('open');
      }
    });
  });

  // Fade-in on scroll
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // Active sidebar highlight
  const sections     = document.querySelectorAll('section[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) link.classList.add('active');
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  // Progress bar
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    progressBar.style.transform = `scaleX(${Math.min(scrolled, 1)})`;
  }, { passive: true });