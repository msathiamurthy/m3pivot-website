/**
 * Google Analytics 4 + Microsoft Clarity
 * -------------------------------------------------
 * 1. Follow ANALYTICS.md to create properties and copy your IDs.
 * 2. Set the two variables below (non-empty string = enabled).
 * 3. Deploy. Scripts load only when an ID is set.
 */
(function () {
  var GA4_MEASUREMENT_ID = "G-2DCR979RGP";
  var CLARITY_PROJECT_ID = "w059vx4qc6";

  /* --- Google Analytics 4 --- */
  if (GA4_MEASUREMENT_ID) {
    var gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src =
      "https://www.googletagmanager.com/gtag/js?id=" +
      encodeURIComponent(GA4_MEASUREMENT_ID);
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA4_MEASUREMENT_ID);
  }

  /* --- Microsoft Clarity --- */
  if (CLARITY_PROJECT_ID) {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  }
})();
