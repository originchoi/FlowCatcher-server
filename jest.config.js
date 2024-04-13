module.exports = {
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  collectCoverageFrom: ["./src/**/*.js"],
  coverageThreshold: {
    global: {
      statements: 60,
      lines: 60,
    },
  },
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  coverageDirectory: "coverage",
};
