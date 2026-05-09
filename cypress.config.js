const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data", "candidatures-retenues.json");
const FIXTURE_FILE = path.join(
  __dirname,
  "cypress",
  "fixtures",
  "candidatures-retenues.json"
);

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on) {
      on("task", {
        seedDataFile() {
          fs.copyFileSync(FIXTURE_FILE, DATA_FILE);
          return null;
        },
        cleanDataFile() {
          if (fs.existsSync(DATA_FILE)) {
            fs.unlinkSync(DATA_FILE);
          }
          return null;
        },
      });
    },
  },
});
