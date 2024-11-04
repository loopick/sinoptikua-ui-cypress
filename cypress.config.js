const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://ua.sinoptik.ua/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    watchForFileChanges: false,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 20000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    taskTimeout: 20000,
    execTimeout: 20000,
  },
});
