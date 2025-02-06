const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Your event handlers can be added here, for example:
      // on('before:run', () => {
      //   // Custom setup logic
      // });
    },
    trashAssetsBeforeRuns: true, 
  },
});
