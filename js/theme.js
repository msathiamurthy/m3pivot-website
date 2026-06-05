/**
 * Site theme — defaults to OS preference; manual toggle lasts for the current tab only.
 */
(function () {
  var STORAGE_KEY = "m3-theme";
  var THEME_COLORS = { light: "#f3f1ec", dark: "#1c2433" };

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    /* ignore legacy persisted preference */
  }

  function getStored() {
    try {
      return sessionStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function resolveTheme() {
    var stored = getStored();
    return stored === "light" || stored === "dark" ? stored : getSystemTheme();
  }

  function updateMeta(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);
  }

  function updateToggles(theme) {
    var isDark = theme === "dark";
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      btn.setAttribute("aria-pressed", String(isDark));
    });
  }

  function applyTheme(theme, persist) {
    if (theme !== "light" && theme !== "dark") theme = "light";
    document.documentElement.setAttribute("data-theme", theme);
    updateMeta(theme);
    updateToggles(theme);
    if (persist) {
      try {
        sessionStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        /* ignore */
      }
    }
    document.dispatchEvent(
      new CustomEvent("m3:theme-change", { detail: { theme: theme } })
    );
  }

  function toggleTheme() {
    var current =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    applyTheme(current === "dark" ? "light" : "dark", true);
  }

  function bind() {
    document.addEventListener("click", function (e) {
      if (e.target.closest(".theme-toggle")) toggleTheme();
    });
    applyTheme(resolveTheme(), false);

    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", function () {
      if (!getStored()) {
        applyTheme(getSystemTheme(), false);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }

  document.addEventListener("m3:header-ready", function () {
    updateToggles(resolveTheme());
  });

  window.M3Theme = {
    get: resolveTheme,
    apply: function (theme) {
      applyTheme(theme, true);
    },
    toggle: toggleTheme,
  };
})();
