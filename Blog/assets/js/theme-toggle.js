(() => {
  const body = document.body;
  const themeToggle = document.getElementById('theme-toggle');
  const dysToggle = document.getElementById('dys-toggle');

  const KEYS = {
    theme: 'theme',
    dys: 'pb_dys_mode',
  };

  const CLASSES = {
    dark: 'dark-mode',
    dys: 'dys-mode',
  };

  const getStoredTheme = () => {
    const savedTheme = localStorage.getItem(KEYS.theme);
    if (savedTheme) return savedTheme;

    const prefersDark =
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    const isDark = theme === 'dark';
    body.classList.toggle(CLASSES.dark, isDark);
    localStorage.setItem(KEYS.theme, theme);

    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀️ Mode clair' : '🌙 Mode sombre';
    }
  };

  const toggleTheme = () => {
    const isDark = body.classList.contains(CLASSES.dark);
    setTheme(isDark ? 'light' : 'dark');
  };

  const setDysMode = (enabled) => {
    body.classList.toggle(CLASSES.dys, enabled);
    localStorage.setItem(KEYS.dys, enabled ? '1' : '0');

    if (dysToggle) {
      dysToggle.textContent = enabled ? 'Dys ✔' : 'Dys';
    }
  };

  const toggleDysMode = () => {
    setDysMode(!body.classList.contains(CLASSES.dys));
  };

  // Initialisation
  setTheme(getStoredTheme());
  setDysMode(localStorage.getItem(KEYS.dys) === '1');

  // Events
  themeToggle?.addEventListener('click', toggleTheme);
  dysToggle?.addEventListener('click', toggleDysMode);
})();