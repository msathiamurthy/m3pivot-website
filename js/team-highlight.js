/**
 * Highlight + scroll to a team member from ?member= or #member-* (all browsers).
 */
(function () {
  function memberIdFromUrl() {
    var search = window.location.search;
    if (search) {
      var fromQuery = new URLSearchParams(search).get("member");
      if (fromQuery) {
        return fromQuery.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
      }
    }
    var hash = (window.location.hash || "").replace(/^#/, "").trim();
    hash = hash.split("?")[0].split("&")[0];
    if (hash.indexOf("member-") === 0) {
      return hash.slice(7).replace(/[^a-z0-9-]/g, "");
    }
    return "";
  }

  function highlightMember() {
    var member = memberIdFromUrl();
    if (!member) return;

    var cards = document.querySelectorAll(".team-card[data-member]");
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("team-card--highlight");
    }

    var target = document.querySelector(
      '.team-card[data-member="' + member + '"]'
    );
    if (!target) return;

    target.classList.add("team-card--highlight");

    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function scrollToTarget() {
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    }

    if (document.readyState === "complete") {
      requestAnimationFrame(function () {
        requestAnimationFrame(scrollToTarget);
      });
    } else {
      window.addEventListener("load", scrollToTarget, { once: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", highlightMember);
  } else {
    highlightMember();
  }
})();
