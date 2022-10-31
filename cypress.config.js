const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://en.wikipedia.org/wiki/Main_Page',
    specPattern: 'cypress/e2e/*.cy.js'
  },
  
});
