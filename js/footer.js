/**
 * Global site footer — edit markup here to update all pages.
 * Set data-footer-context on <html>: "home" | "sub" | "team" | "contact"
 */
(function () {
  var mount = document.querySelector("[data-global-footer]");
  if (!mount) return;

  var ctx =
    document.documentElement.getAttribute("data-footer-context") || "sub";
  var hrefs = {
    home: {
      home: "#home",
      team: "team.html",
      startups: "startups.html",
      investors: "investors.html",
      contact: "contact.html",
    },
    sub: {
      home: "index.html",
      team: "team.html",
      startups: "startups.html",
      investors: "investors.html",
      contact: "contact.html",
    },
    team: {
      home: "index.html",
      team: "team.html",
      startups: "startups.html",
      investors: "investors.html",
      contact: "contact.html",
    },
    contact: {
      home: "index.html",
      team: "team.html",
      startups: "startups.html",
      investors: "investors.html",
      contact: "contact.html",
    },
  };

  var h = hrefs[ctx] ? hrefs[ctx] : hrefs.sub;

  mount.innerHTML =
    '<div class="container container--wide footer-inner">' +
    '<div class="footer-about">' +
    '<img class="footer-logo-mark" src="/assets/images/small-logo.png" alt="" decoding="async" />' +
    '<div class="footer-about__text">' +
    "<p>© 2025 M3Pivot. All rights reserved.</p>" +
    '<p class="footer-tagline">' +
    "Guiding early-stage startups through Money, Market and Management." +
    "</p>" +
    "</div>" +
    "</div>" +
    '<nav class="footer-nav" aria-label="Footer">' +
    '<a href="' +
    h.home +
    '">Home</a>' +
    '<a href="' +
    h.team +
    '">Team</a>' +
    '<a href="' +
    h.startups +
    '">Startups</a>' +
    '<a href="' +
    h.investors +
    '">Investors</a>' +
    '<a href="' +
    h.contact +
    '">Contact</a>' +
    "</nav>" +
    "</div>";
})();
