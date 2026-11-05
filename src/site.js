// Small enhancements. Everything works without them.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A new page always opens at the top. Back and forward keep their place.
  const toTop = () => { if (!location.hash) window.scrollTo(0, 0); };
  try {
    const nav = performance.getEntriesByType("navigation")[0];
    if (!nav || nav.type !== "back_forward") { toTop(); addEventListener("load", toTop); }
  } catch { toTop(); }

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

// Lucky Riches: one cashier for new and returning players, instead of a second quick-deposit build.
DEMOS["lucky-cashier"] = (root) => {
  const method = (logo, cls, name, sub, extra = "") => `<div class="lr-row ${extra}"><span class="lr-logo ${cls}">${logo}</span><span class="grow">${name}${sub ? `<small>${sub}</small>` : ""}</span><span class="lr-chev">›</span></div>`;
  const pend = (amt, via, when) => `<div class="lr-row lr-pend"><span class="lr-chev">◷</span><span class="grow"><b>${amt}</b><span class="lr-tag">Pending</span><small>${via} · ${when}</small></span><span class="lr-rev">↺ Reverse</span></div>`;
  root.innerHTML = `
  <div class="d-seg" role="group" aria-label="Show the cashier for">
    <button type="button" aria-pressed="true" data-p="new">First deposit</button>
    <button type="button" aria-pressed="false" data-p="returning">Returning player</button>
  </div>
  <div class="d-body" style="margin-top:24px">
    <div class="lr" role="group" data-player="new" aria-label="Cashier, recreated from the shipped design">
      <div class="lr-head"><div class="lr-tabs"><span class="on">Deposit</span><span>Withdraw</span></div><span class="lr-bal">$200</span><span class="lr-x">×</span></div>
      <div class="lr-only" data-flash><div>${pend("$200", "Interac", "2h ago")}${pend("$120", "MiFinity", "3 days ago")}</div></div>
      <p class="lr-h">Select bonus</p>
      <div class="lr-bonus">
        <div class="lr-row"><span class="lr-check on">✓</span><span class="grow">First Deposit Bonus<small>100% match up to $1,000 + 50 Free Spins</small></span></div>
        <div class="lr-row"><span class="lr-check"></span><span class="grow">No thanks, I'll skip the bonus this time</span></div>
      </div>
      <div class="lr-new">
        <p class="lr-h">Popular methods</p>
        ${method("Interac", "interac", "Interac", "$20 - $10,000")}
        ${method("VISA", "visa", "VISA / Mastercard", "$20 - $10,000")}
        ${method("MiFinity", "", "MiFinity", "$20 - $10,000")}
        <p class="lr-h">Other methods</p>
        ${method("Crypto", "", "See more payment methods", "")}
      </div>
      <div class="lr-ret" data-flash>
        <p class="lr-h">Saved methods</p>
        ${method("VISA", "visa", "•••• 1772", "Last used · Default", "lr-sel")}
        ${method("VISA", "visa", "•••• 8900", "Saved card")}
        <p class="lr-h">Other methods</p>
        ${method("Interac", "interac", "Interac", "$20 - $10,000")}
      </div>
    </div>
    <div class="d-side">
      <h3>One screen, two players</h3>
      <p class="d-msg" aria-live="polite"></p>
      <dl class="d-count">
        <dt>Deposit journeys to build</dt><dd>1, not 2</dd>
        <dt>Cashier behaviour rules</dt><dd>86, one spec</dd>
        <dt>Deposit completion</dt><dd>79% since launch</dd>
      </dl>
    </div>
  </div>`;
  const lr = root.querySelector(".lr"), msg = root.querySelector(".d-msg");
  const copy = {
    new: "A new player picks a bonus and a method from scratch. Switch to a returning player and watch what changes.",
    returning: "Same cashier. The last-used card is pre-selected and pending withdrawals can be reversed in place. That's the speed the quick-deposit pop-up promised, without a second journey to build and keep in sync.",
  };
  const set = (p, flash) => {
    lr.dataset.player = p; msg.textContent = copy[p];
    root.querySelectorAll(".d-seg button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.p === p));
    if (flash && p === "returning") lr.querySelectorAll("[data-flash]").forEach((el) => { el.classList.remove("lr-flash"); void el.offsetWidth; el.classList.add("lr-flash"); });
  };
  root.querySelectorAll(".d-seg button").forEach((b) => b.addEventListener("click", () => set(b.dataset.p, true)));
  set("new");
};

document.querySelectorAll("[data-demo]").forEach((fig) => {
  const fn = DEMOS[fig.dataset.demo]; const stage = fig.querySelector(".demo-stage");
  if (fn && stage) { stage.innerHTML = ""; fn(stage); fig.classList.add("demo-live"); }
});
