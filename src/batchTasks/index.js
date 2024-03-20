const Session = require("../models/Session");

async function checkInactiveSessions() {
  const threshold = new Date(new Date().getTime() - 30 * 60000);

  await Session.updateMany(
    { lastUpdated: { $lt: threshold }, isActive: true },
    { isActive: false },
  );
}

module.exports = { checkInactiveSessions };
