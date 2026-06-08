/**
 * Homepage floating section nav — home page only.
 */
(function () {
  if (document.documentElement.getAttribute("data-site-context") !== "home") {
    return;
  }

  var nav = document.getElementById("home-float-nav");
  if (!nav) return;

  var toggle = nav.querySelector(".home-float-nav__toggle");
  var links = nav.querySelectorAll(".home-float-nav__link");
  var mqMobile = window.matchMedia("(max-width: 767px)");

  var SECTION_ORDER = [
    "home",
    "team-preview",
    "startups-preview",
    "sample-portfolio",
    "investors-preview",
  ];

  var sections = SECTION_ORDER.map(function (id) {
    var el = document.getElementById(id);
    var link = nav.querySelector('.home-float-nav__link[href="#' + id + '"]');
    return el && link ? { id: id, link: link, el: el } : null;
  }).filter(Boolean);

  function getHeaderOffset() {
    var height = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--site-header-height"
      ),
      10
    );
    return (isNaN(height) ? 64 : height) + 16;
  }

  function scrollToSection(target, id) {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    var top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      getHeaderOffset();

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Close section menu" : "Open section menu"
      );
    }
    document.body.classList.toggle("home-float-nav-open", open);
  }

  function closeNav() {
    setOpen(false);
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });
  }

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      var id = href.slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      scrollToSection(target, id);
      if (mqMobile.matches) closeNav();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  document.addEventListener("click", function (e) {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(e.target)) return;
    closeNav();
  });

  function updateActive() {
    var scrollY = window.scrollY + getHeaderOffset();
    var current = sections[0];

    sections.forEach(function (item) {
      if (item.el.offsetTop <= scrollY) current = item;
    });

    if (window.scrollY < 80) current = sections[0];

    sections.forEach(function (item) {
      var active = current && item.id === current.id;
      item.link.classList.toggle("is-active", active);
      if (active) item.link.setAttribute("aria-current", "true");
      else item.link.removeAttribute("aria-current");
    });
  }

  var scrollRaf = null;
  window.addEventListener(
    "scroll",
    function () {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(function () {
        scrollRaf = null;
        updateActive();
      });
    },
    { passive: true }
  );

  updateActive();
})();
