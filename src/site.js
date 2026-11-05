// Small enhancements. Everything works without them.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Copy email
  document.querySelectorAll(".copy-email").forEach((a) => {
    a.addEventListener("click", async (e) => {
      if (!navigator.clipboard) return;
      e.preventDefault();
      try { await navigator.clipboard.writeText(a.dataset.email); a.textContent = "Copied"; }
      catch { location.href = a.href; return; }
      setTimeout(() => (a.textContent = "Copy email"), 1800);
    });
  });

  // Case studies: click any image to see it full size
  const zoomables = document.querySelectorAll(".hero img, .fig img");
  if (zoomables.length) {
    const box = document.createElement("div");
    box.className = "lightbox"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Image, full size");
    box.innerHTML = '<img alt=""><button type="button">Close</button>';
    document.body.appendChild(box);
    const big = box.querySelector("img"), btn = box.querySelector("button");
    let last = null;
    const close = () => { box.classList.remove("on"); last && last.focus(); };
    zoomables.forEach((im) => {
      im.tabIndex = 0;
      const open = () => {
        last = im;
        const set = im.getAttribute("srcset");
        big.src = set ? set.split(",").pop().trim().split(" ")[0] : im.currentSrc || im.src;
        big.alt = im.alt; box.classList.add("on"); btn.focus();
      };
      im.addEventListener("click", open);
      im.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
    box.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && box.classList.contains("on")) close(); });
  }

  // Case studies: arrow keys move between studies
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || document.querySelector(".lightbox.on")) return;
    if (/input|textarea|select/i.test(document.activeElement.tagName)) return;
    const a = document.querySelector(`.prevnext a[data-key="${e.key}"]`);
    if (a) location.href = a.href;
  });
  document.querySelectorAll(".prevnext a[data-key]").forEach((a) => {
    const s = a.querySelector("span"); if (s) s.dataset.k = a.dataset.key === "ArrowLeft" ? "←" : "→";
  });
})();
