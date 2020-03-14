module.exports = {
  collectCoverageFrom: ["src/*.{js,jsx}", "!**/node_modules/**", "!**/dist"],
  coverageReporters: ["json", "lcov", "text", "clover", "text-summary"]
};
