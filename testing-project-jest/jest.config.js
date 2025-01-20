module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./src/setupTests.js"], // Ensure this file exists
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy", // To handle CSS imports in tests
  },
};
