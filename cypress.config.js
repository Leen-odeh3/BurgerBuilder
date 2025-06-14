const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl:"https://burger-builder.habibhinn.com/",
    reporter: "mochawesome",
      reporterOptions: {
        reportDir: "cypress/myReport", 
        overwrite: false,
        html: true,
        json: false,
        timestamp: "mmddyyyy_HHMMss"
    },
    video:true,
    videoCompression:0
  },
});
