/**
 * Send old home-page anchor links to dedicated pages (cached nav/footer, bookmarks).
 */
(function () {
  var contactTargets = [
    "#contact",
    "index.html#contact",
    "/index.html#contact",
    "pages/contact.html",
    "/pages/contact.html",
  ];
  var teamTargets = [
    "#team",
    "index.html#team",
    "/index.html#team",
    "pages/team.html",
    "/pages/team.html",
  ];

  function isHomePage() {
    var path = location.pathname;
    return (
      path === "/" ||
      path.endsWith("/index.html") ||
      path.endsWith("/pages/index.html")
    );
  }

  function redirectHash() {
    if (!isHomePage()) return;
    if (location.hash === "#contact") {
      location.replace("contact.html");
    } else if (location.hash === "#team") {
      location.replace("team.html");
    }
  }

  redirectHash();
  window.addEventListener("hashchange", redirectHash);

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (!link) return;
    var href = link.getAttribute("href");
    if (contactTargets.indexOf(href) !== -1) {
      event.preventDefault();
      location.href = "contact.html";
      return;
    }
    if (teamTargets.indexOf(href) !== -1) {
      event.preventDefault();
      location.href = "team.html";
    }
  });
})();
