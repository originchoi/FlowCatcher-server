(function () {
  let flowcatcherQueue = window.flowcatcher.q || [];
  let flowcatcherProjectId;
  let isSessionCreating = false;
  let debounceTimer;

  async function postData(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async function trackPageView() {
    const projectId = flowcatcherProjectId;
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
            projectId,
          },
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

  function processQueue() {
    flowcatcherQueue.forEach(([command, projectId]) => {
      if (command === "init") {
        flowcatcherProjectId = projectId;
        trackPageView();
      }
    });

    flowcatcherQueue = [];
  }

  function handleLocationChange() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(trackPageView, 10);
  }

  window.flowcatcher = function (...args) {
    flowcatcherQueue.push(args);
    processQueue();
  };

  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;

  window.history.pushState = function (...args) {
    originalPushState.apply(this, args);
    handleLocationChange();
  };

  window.history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    handleLocationChange();
  };

  window.addEventListener("popstate", handleLocationChange);
  processQueue();
})();
