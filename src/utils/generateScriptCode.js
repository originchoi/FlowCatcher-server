exports.generateScriptCode = ({ projectId }) => {
  const scriptCode = `
    <script async src="https://api.flow-catcher.com/track/track.js"></script>
    <script>
      window.flowcatcher = window.flowcatcher || function() {
        (flowcatcher.q = flowcatcher.q || []).push(arguments);
      };
      flowcatcher("init", "${projectId}");
    </script>`;

  return scriptCode;
};
