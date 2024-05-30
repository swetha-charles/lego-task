const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: false,
  fileServerFolder: './',
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    screenshotsFolder: 'screenshots',
    specPattern: 'integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'support/index.js',
  },
});
