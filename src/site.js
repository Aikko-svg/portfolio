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

// ---------- Live demos ----------
const DEMOS = {};

// Hastings Direct: the old four-step bar that kept growing, against the three-stage journey.
DEMOS["hastings-progress"] = (root) => {
  const Q = {
    Details: ["What's the registration number?", "Is this your car?", "Is it manual or automatic?", "What's your date of birth?", "How long have you held your licence?", "Any claims in the last 5 years?"],
    Cover: ["What do you mainly use the car for?", "Roughly how many miles a year?", "Where is it kept overnight?", "How much voluntary excess?", "When should cover start?"],
    Quote: ["Which policy would you like?"],
  };
  const after = Object.entries(Q).flatMap(([stage, qs]) => qs.map((q, i) => ({ stage, q, i, n: qs.length })));
  // Old journey: four steps on the bar, but step 2 never ends.
  const before = after.slice(0, 11).map((x, k) => ({ q: x.q, step: k < 3 ? 1 : 2 }));
  root.innerHTML = `
  <div class="d-top">
    <div class="d-seg" role="tablist" aria-label="Version">
      <button role="tab" aria-selected="true" data-mode="before">Before</button>
      <button role="tab" aria-selected="false" data-mode="after">After</button>
    </div>
    <button class="d-reset" type="button">Start again</button>
  </div>
  <div class="d-body">
    <div class="d-phone" data-mode="before">
      <div class="d-bar" aria-hidden="true"></div>
      <div class="d-q"><p class="d-label"></p><div class="d-input"></div></div>
      <button class="d-next" type="button">Next</button>
      <div class="d-end" hidden></div>
    </div>
    <div class="d-side">
      <p class="d-status" aria-live="polite"></p>
      <p class="d-note"></p>
    </div>
  </div>`;
  const $ = (s) => root.querySelector(s);
  const phone = $(".d-phone"), bar = $(".d-bar"), label = $(".d-label"), status = $(".d-status"), note = $(".d-note"), end = $(".d-end"), next = $(".d-next");
  let mode = "before", i = 0;

  const render = () => {
    phone.dataset.mode = mode; end.hidden = true; next.hidden = false; $(".d-q").hidden = false;
    if (mode === "before") {
      const cur = before[Math.min(i, before.length - 1)];
      bar.innerHTML = [1, 2, 3, 4].map((k) => `<span class="${k < cur.step ? "done" : k === cur.step ? "cur" : ""}">${k}</span>`).join("");
      label.textContent = cur.q;
      status.textContent = `Question ${Math.min(i, before.length - 1) + 1}. Still step ${cur.step} of 4.`;
      note.textContent = i < 4 ? "Four steps, the bar says. Keep going." : "The bar hasn't moved. You can't tell how much is left.";
      if (i >= before.length) {
        $(".d-q").hidden = true; next.hidden = true; end.hidden = false;
        end.innerHTML = `<p>“It says it has four steps, but it keeps adding and adding questions.”</p><span>Usability test participant</span>`;
        status.textContent = "11 questions in, still on step 2 of 4";
        note.textContent = "Only 7 of 11 testers reached a price on the old journey.";
      }
    } else {
      const cur = after[Math.min(i, after.length - 1)];
      const stages = Object.keys(Q), si = stages.indexOf(cur.stage);
      const doneQs = i, total = after.length;
      bar.innerHTML = `<div class="d-track"><i style="width:${Math.min(100, (doneQs / (total - 1)) * 100)}%"></i></div>` +
        stages.map((s, k) => `<span class="${k < si ? "done" : k === si ? "cur" : ""}"><b>${k < si ? "✓" : k + 1}</b>${s}</span>`).join("");
      label.textContent = cur.q;
      status.textContent = `${cur.stage}: question ${cur.i + 1} of ${cur.n}`;
      note.textContent = "Three stages, fixed from the first screen. The bar fills, it never grows.";
      if (i >= after.length) {
        $(".d-q").hidden = true; next.hidden = true; end.hidden = false;
        bar.querySelectorAll("span").forEach((s) => s.className = "done");
        end.innerHTML = `<p class="d-price">Your quote is ready</p><span>Every question answered, no surprises on the way</span>`;
        status.textContent = "Quote reached";
        note.textContent = "Same questions. Clearer grouping, and you always know what's left.";
      }
    }
  };
  next.addEventListener("click", () => { i++; render(); });
  $(".d-reset").addEventListener("click", () => { i = 0; render(); next.focus(); });
  root.querySelectorAll(".d-seg button").forEach((b) => b.addEventListener("click", () => {
    mode = b.dataset.mode; i = 0;
    root.querySelectorAll(".d-seg button").forEach((x) => x.setAttribute("aria-selected", x === b));
    render();
  }));
  render();
};

document.querySelectorAll("[data-demo]").forEach((fig) => {
  const fn = DEMOS[fig.dataset.demo]; const stage = fig.querySelector(".demo-stage");
  if (fn && stage) { stage.innerHTML = ""; fn(stage); fig.classList.add("demo-live"); }
});
