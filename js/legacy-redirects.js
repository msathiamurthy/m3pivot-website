/**
 * Legacy URL handling — old home anchors, /pages/* paths, and cached nav links.
 */
(function () {
  var path = location.pathname || "";

  var pagesMap = {
    "index.html": "/",
    "contact.html": "/contact.html",
    "team.html": "/team.html",
    "startups.html": "/startups.html",
    "investors.html": "/investors.html",
  };

  var pagesMatch = path.match(/\/pages\/([^/]+\.html)$/i);
  if (pagesMatch && pagesMap[pagesMatch[1]]) {
    location.replace(pagesMap[pagesMatch[1]]);
    return;
  }

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
    return path === "/" || path.endsWith("/index.html");
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
