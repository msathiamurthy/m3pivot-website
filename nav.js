(function () {
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  const backdrop = document.querySelector(".nav-backdrop");
  if (!header || !btn || !nav) return;

  function setOpen(open) {
    header.classList.toggle("nav-open", open);
    document.body.classList.toggle("nav-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  btn.addEventListener("click", function () {
    setOpen(!header.classList.contains("nav-open"));
  });

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setOpen(false);
    });
  }

  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  var mq = window.matchMedia("(min-width: 768px)");
  function onWide() {
    if (mq.matches) setOpen(false);
  }
  mq.addEventListener("change", onWide);
})();
