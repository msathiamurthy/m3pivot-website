/**
 * Portfolio "Others" modal — works on Home, Startups, and Investors pages.
 * Opens on any element with [data-m3-more-modal] attribute.
 */
(function () {
  var COMPANIES = [
    {
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
      label: "Agritech",
      text: "Well funded agritech startup based in Tamilnadu"
    },
    {
      svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>',
      label: "Recruitment Tech",
      text: "Recruitment platform that a founder is still ideating for product fitment"
    }
  ];

  var overlay = null;

  function buildModal() {
    var el = document.createElement("div");
    el.id = "m3-more-modal-overlay";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "More portfolio companies");

    el.innerHTML =
      '<div class="m3-more-modal" role="document">' +
        '<button class="m3-more-modal__close" aria-label="Close dialog">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
        '<div class="m3-more-modal__header">' +
          '<p class="m3-more-modal__kicker">Sample Portfolio</p>' +
          '<h2 class="m3-more-modal__title">More in our portfolio</h2>' +
          '<p class="m3-more-modal__desc">A few more partnerships we\'re proud of — details shared in confidence.</p>' +
        '</div>' +
        '<ul class="m3-more-modal__list">' +
          COMPANIES.map(function (c) {
            return (
              '<li class="m3-more-modal__item">' +
                '<span class="m3-more-modal__item-icon">' + c.svg + '</span>' +
                '<div>' +
                  '<span class="m3-more-modal__item-label">' + c.label + '</span>' +
                  '<p class="m3-more-modal__item-text">' + c.text + '</p>' +
                '</div>' +
              '</li>'
            );
          }).join("") +
        '</ul>' +
      '</div>';

    el.addEventListener("click", function (e) {
      if (e.target === el) closeModal();
    });

    el.querySelector(".m3-more-modal__close").addEventListener("click", closeModal);

    document.body.appendChild(el);
    return el;
  }

  function openModal() {
    if (!overlay) overlay = buildModal();
    requestAnimationFrame(function () {
      overlay.classList.add("is-open");
    });
    document.body.style.overflow = "hidden";
    var closeBtn = overlay.querySelector(".m3-more-modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-m3-more-modal]");
    if (trigger) {
      e.preventDefault();
      openModal();
    }
  });

  window.m3MoreModal = { open: openModal, close: closeModal };
})();
