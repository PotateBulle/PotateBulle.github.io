(function () {
  // Date footer
  const gen = document.getElementById("gen");
  if (gen) gen.textContent = new Date().toLocaleString("fr-FR");

  // Nettoyage de sécurité : retire des artefacts de type contentReference[...] si jamais présents
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const bad = /:contentReference\[[^\]]+\]\{[^}]+\}/g;
  const bad2 = /contentReference\[[^\]]+\]\{[^}]+\}/g;

  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue && (bad.test(node.nodeValue) || bad2.test(node.nodeValue))) {
      node.nodeValue = node.nodeValue.replace(bad, "").replace(bad2, "").replace(/\s{2,}/g, " ").trim();
    }
  }

  // TOC active link
  const tocLinks = Array.from(document.querySelectorAll("#toc a"));
  const sections = tocLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  let currentId = "";

  const observer = new IntersectionObserver((entries) => {
    // On prend la section la plus "haute" visible dans la fenêtre
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top))[0];

    if (!visible) return;

    const id = visible.target.getAttribute("id");
    if (!id || id === currentId) return;
    currentId = id;

    tocLinks.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
  }, {
    rootMargin: "-20% 0px -70% 0px",
    threshold: [0.01, 0.05, 0.1, 0.2]
  });

  sections.forEach(sec => observer.observe(sec));
})();
