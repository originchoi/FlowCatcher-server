const UglifyJS = require("uglify-js");

exports.generateScriptCode = ({ userId, projectId, apiKey }) => {
  const pageViewTrackerCode = `
  (function () {
    let isSessionCreating = false;
    let debounceTimer;

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
      originalPushState.apply(this, arguments);
      handleLocationChange();
    };

    history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      handleLocationChange();
    };

    window.addEventListener("popstate", handleLocationChange);

    function handleLocationChange() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(trackPageView, 10);
    }

    async function trackPageView() {
      const userId = "${userId}";
      const projectId = "${projectId}";
      const apiKey = "${apiKey}";
      const sessionId = sessionStorage.getItem("sessionId") || null;
      const currentUrl = window.location.href;
      const pageTitle = window.location.pathname;
      const referrer = sessionStorage.getItem("referrer") || "";

      if (!sessionId && !isSessionCreating) {
        isSessionCreating = true;

        try {
          const sessionResponse = await postData(
            "https://api.flow-catcher.com/api/sessions",
            {
              userId,
              projectId,
              apiKey,
            }
          );

          sessionStorage.setItem("sessionId", sessionResponse.sessionId);
          isSessionCreating = false;
        } catch (error) {
          console.error("Session creation failed:", error);
          isSessionCreating = false;
          return;
        }
      }

      try {
        await postData("https://api.flow-catcher.com/api/pageviews", {
          sessionId: sessionStorage.getItem("sessionId"),
          url: currentUrl,
          pageTitle,
          referrer,
          timestamp: new Date().toISOString(),
        });

        sessionStorage.setItem("referrer", currentUrl);
      } catch (error) {
        console.error("Error recording page view:", error);
      }
    }

    async function postData(url, data) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    }

    trackPageView();
  })();`;

  const uglifyOptions = {
    mangle: true,
    compress: true,
  };

  const uglifiedCode = UglifyJS.minify(pageViewTrackerCode, uglifyOptions).code;

  return `<script>${uglifiedCode}</script>`;
};
