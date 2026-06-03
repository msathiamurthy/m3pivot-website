/**
 * Global site header — edit markup here to update all pages.
 * Set data-site-context on <html>: home | team | startups | investors | contact
 * (data-footer-context is still supported for older pages.)
 */
(function () {
  var mount = document.querySelector("[data-global-header]");
  if (!mount) return;

  var ctx =
    document.documentElement.getAttribute("data-site-context") ||
    document.documentElement.getAttribute("data-footer-context") ||
    "sub";

  if (ctx === "sub") {
    var path = (window.location.pathname || "").toLowerCase();
    if (path.indexOf("startups") !== -1) ctx = "startups";
    else if (path.indexOf("investors") !== -1) ctx = "investors";
  }

  var hrefs = {
    home: {
      home: "#home",
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
    startups: {
      home: "index.html",
      team: "team.html",
      startups: "startups.html",
      investors: "investors.html",
      contact: "contact.html",
    },
    investors: {
      home: "index.html",
      team: "team.html",
      startups: "startups.html",
      investors: "investors.html",
      contact: "contact.html?role=investor",
    },
    contact: {
      home: "index.html",
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
  };

  var h = hrefs[ctx] || hrefs.sub;

  var items = [
    { id: "home", label: "Home" },
    { id: "team", label: "Team" },
    { id: "startups", label: "Startups" },
    { id: "investors", label: "Investors" },
    { id: "contact", label: "Contact" },
  ];

  function isActive(id) {
    return ctx === id;
  }

  var navLinks = items
    .map(function (item) {
      var cls = isActive(item.id) ? ' class="active"' : "";
      return (
        '<a' +
        cls +
        ' href="' +
        h[item.id] +
        '">' +
        item.label +
        "</a>"
      );
    })
    .join("");

  mount.innerHTML =
    '<div class="container container--wide header-inner">' +
    '<a class="brand" href="' +
    (ctx === "home" ? "#home" : h.home) +
    '">' +
    '<img src="/assets/images/full-logo.png" alt="M3Pivot" width="200" height="34" decoding="async" />' +
    "</a>" +
    '<div class="header-end">' +
    '<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">' +
    '<span class="menu-toggle-box" aria-hidden="true"><span class="menu-toggle-inner"></span></span>' +
    "</button>" +
    '<div class="nav-backdrop" aria-hidden="true"></div>' +
    '<nav id="primary-nav" class="nav-links" aria-label="Primary">' +
    navLinks +
    "</nav>" +
    "</div>" +
    "</div>";

  document.dispatchEvent(new CustomEvent("m3:header-ready"));
})();
