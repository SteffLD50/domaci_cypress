const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        experimentalSessionAndOrigin: true,
        baseUrl: "https://gallery-app.vivifyideas.com/",
        env: {
            validEmail: "nadjlukac.test@gmail.com",
            validPassword: "testqa22test",
            apiUrl: "https://gallery-api.vivifyideas.com/api",
        },
    },
});
