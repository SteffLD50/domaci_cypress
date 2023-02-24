// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginThroughBackend", () => {
    cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/auth/login`,
        body: {
            email: Cypress.env("validEmail"),
            password: Cypress.env("validPassword"),
        },
    })
        .its("body")
        .then((response) => {
            window.localStorage.setItem("user_id", response.user_id);
            window.localStorage.setItem("token", response.access_token);
        });
});

Cypress.Commands.add(
    "registerViaBackend",
    (firstName, lastName, email, password) => {
        cy.request({
            method: "POST",
            url: `${Cypress.env("apiUrl")}/auth/register`,
            body: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                password_confirmation: password,
                terms_and_conditions: true,
            },
        });
    }
);
