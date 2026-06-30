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
  var revealSection = document.getElementById("proof");
  var mqMobile = window.matchMedia("(max-width: 767px)");

  var SECTION_ORDER = [
    "proof",
    "team-preview",
    "startups-preview",
    "testimonials",
    "investors-preview",
    "contact",
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

  function updateVisibility() {
    if (!revealSection) {
      nav.classList.add("is-visible");
      return;
    }

    var show =
      window.scrollY + getHeaderOffset() >= revealSection.offsetTop - 32;

    nav.classList.toggle("is-visible", show);
    nav.setAttribute("aria-hidden", show ? "false" : "true");
    if (!show) closeNav();
  }

  function updateActive() {
    if (!nav.classList.contains("is-visible")) return;

    var scrollY = window.scrollY + getHeaderOffset();
    var current = sections[0];

    if (window.scrollY < 80) {
      sections.forEach(function (item) {
        item.link.classList.remove("is-active");
        item.link.removeAttribute("aria-current");
      });
      return;
    }

    sections.forEach(function (item) {
      if (item.el.offsetTop <= scrollY) current = item;
    });

    sections.forEach(function (item) {
      var active = current && item.id === current.id;
      item.link.classList.toggle("is-active", active);
      if (active) item.link.setAttribute("aria-current", "true");
      else item.link.removeAttribute("aria-current");
    });
  }

  function onScroll() {
    updateVisibility();
    updateActive();
  }

  var scrollRaf = null;
  window.addEventListener(
    "scroll",
    function () {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(function () {
        scrollRaf = null;
        onScroll();
      });
    },
    { passive: true }
  );

  window.addEventListener("resize", onScroll);
  onScroll();
})();
