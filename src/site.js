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

// Home strip: vertical scroll moves the slides sideways; one line untangles as you go.
(() => {
  const strip = document.querySelector(".strip");
  if (!strip) return;
  const desktop = matchMedia("(min-width: 768px)");
  const track = strip.querySelector(".slides");
  const slides = [...track.children];
  const path = strip.querySelector(".thread path");
  const svg = strip.querySelector(".thread");
  const ticks = strip.querySelector(".ticks");
  const N = 30; // tick marks
  ticks.innerHTML = Array.from({ length: N }, (_, i) => `<button type="button" aria-label="Go to position ${i + 1}"></button>`).join("");
  const tickEls = [...ticks.children];
  let maxX = 0, maxY = 0;

  const measure = () => {
    if (!desktop.matches) { track.style.transform = ""; return; }
    maxX = track.scrollWidth - innerWidth;
    strip.style.height = `${maxX + innerHeight}px`;
    maxY = strip.offsetHeight - innerHeight;
  };
  // The thread: a looping curve whose loops shrink to nothing as p goes 0 → 1.
  const draw = (p) => {
    const w = svg.clientWidth, h = svg.clientHeight; if (!w || !h) return;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    const amp = Math.min(h * 0.26, 64) * Math.pow(1 - p, 1.25);
    const loops = 11, steps = 900, cy = h / 2;
    let d = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, a = t * loops * Math.PI * 2;
      // Two out-of-step loop frequencies make it read as a knot rather than a coil.
      const x = t * w + amp * (Math.sin(a) * 1.1 + 0.55 * Math.sin(a * 2.37 + 1.3));
      const y = cy + amp * (Math.cos(a * 1.31) * 0.75 + 0.35 * Math.sin(a * 3.07 + 0.4));
      d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
    }
    path.setAttribute("d", d);
  };
  const update = () => {
    if (!desktop.matches) return;
    const y = Math.min(Math.max(scrollY - strip.offsetTop, 0), maxY);
    const p = maxY ? y / maxY : 0;
    track.style.transform = `translate3d(${-p * maxX}px,0,0)`;
    const cur = Math.round(p * (N - 1));
    tickEls.forEach((t, i) => t.classList.toggle("cur", i === cur));
    draw(p);
  };
  const goTo = (p) => scrollTo({ top: strip.offsetTop + p * maxY, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  tickEls.forEach((t, i) => t.addEventListener("click", () => goTo(i / (N - 1))));
  // Arrow keys jump slide to slide
  document.addEventListener("keydown", (e) => {
    if (!desktop.matches || (e.key !== "ArrowRight" && e.key !== "ArrowLeft")) return;
    const xs = slides.map((s) => Math.min(s.offsetLeft - slides[0].offsetLeft, maxX) / (maxX || 1));
    const y = Math.min(Math.max(scrollY - strip.offsetTop, 0), maxY), p = maxY ? y / maxY : 0;
    const next = e.key === "ArrowRight" ? xs.find((x) => x > p + 0.01) : [...xs].reverse().find((x) => x < p - 0.01);
    if (next !== undefined) { e.preventDefault(); goTo(next); }
  });
  let raf = 0;
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
  addEventListener("resize", () => { measure(); update(); });
  desktop.addEventListener("change", () => { strip.style.height = ""; measure(); update(); });
  addEventListener("load", () => { measure(); update(); });
  measure(); update();
})();
