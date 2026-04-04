(function () {
  const themeToggle = document.getElementById('theme-toggle');
  const dysToggle = document.getElementById('dys-toggle');

  /* ============================
     Thème clair / sombre (dark mode)
     ============================ */
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    document.body.classList.add('dark-mode');
  }
  function updateThemeLabel() {
    if (!themeToggle) return;
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️ Mode clair' : '🌙 Mode sombre';
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeLabel();
    });

    updateThemeLabel();
  }

  /* ============================
     Mode Dys (police + espacement)
     ============================ */
  const DYS_KEY = 'pb_dys_mode';
  function applyDysMode(enabled) {
    document.body.classList.toggle('dys-mode', enabled);
    if (dysToggle) {
      dysToggle.textContent = enabled ? 'Dys ✔' : 'Dys';
    }
  }

  const storedDys = localStorage.getItem(DYS_KEY);
  if (storedDys === '1') {
    applyDysMode(true);
  } else {
    applyDysMode(false);
  }
  if (dysToggle) {
    dysToggle.addEventListener('click', function () {
      const enabled = !document.body.classList.contains('dys-mode');
      applyDysMode(enabled);
      localStorage.setItem(DYS_KEY, enabled ? '1' : '0');
    });
  }
})();