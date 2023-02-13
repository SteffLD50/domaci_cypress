let randomEmail = "nebopajo" + Math.floor(Math.random() * 1000) + "@gmail.com";
let randomInvalidEmail =
    "nebopajo" + Math.floor(Math.random() * 1000) + "@gmaill.cooom";

const locators = require("../fixtures/locators.json");

let userData = {
    firstName: "Petar",
    lastName: "Petrovic",
    email: "nebopajo2@gmail.com",
    password: "nebopajo123",
};

before(() => {
    cy.visit("/register");
    cy.get("#first-name").should("have.attr", "required");
    cy.get("#first-name").should("have.attr", "type").and("match", /text/);
    //        cy.get('#first-name').invoke('prop', 'validationMessage')
    //           .should('equal', "Please fill out this field.")
    cy.get("#last-name").should("have.attr", "required");
    cy.get("#last-name").should("have.attr", "type").and("match", /text/);
    //        cy.get('#last-name').invoke('prop', 'validationMessage')
    //          .should('equal', "Please fill out this field.")
    cy.get("#email").should("have.attr", "required");
    cy.get("#email").should("have.attr", "type").and("match", /email/);
    //        cy.get('#email').invoke('prop', 'validationMessage')
    //          .should('equal', "Please fill out this field.")
    cy.get("#password").should("have.attr", "required");
    cy.get("#password")
        .should("have.attr", "type")
        .and("match", /password/);
    //       cy.get('#password').invoke('prop', 'validationMessage')
    //         .should('equal', "Please fill out this field.")
    cy.get("#password-confirmation").should("have.attr", "required");
    cy.get("#password-confirmation")
        .should("have.attr", "type")
        .and("match", /password/);
    //       cy.get('#password-confirmation').invoke('prop', 'validationMessage')
    //         .should('equal', "Please fill out this field.")
});

beforeEach(() => {
    cy.visit("/register");
});

it("Try to register with blank fields", () => {
    cy.get("input:invalid").should("have.length", 5);
    cy.get("button").click();
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
    cy.should("not.contain", "Logout");
});

it("Try to register with only checkbox checked", () => {
    cy.get(":checkbox").check();
    cy.get("input:invalid").should("have.length", 5);
    cy.get("button").click();
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
    cy.should("not.contain", "Logout");
});

it("Try to register with without the First name", () => {
    cy.get(locators.register.lastName).type(userData.lastName);
    cy.get(locators.commonFormElements.emailInput).type(userData.email);
    cy.get(locators.commonFormElements.passwordInput).type(userData.password);
    cy.get(locators.register.passConfirmInput).type(userData.password);
    cy.get(locators.register.tosCheckbox).check();
    cy.get(locators.commonFormElements.submitButton).click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
});

it("Try to register with without the Last name", () => {
    cy.get("#first-name").type("Petar");
    cy.get("#email").type("nebopajo2@gmail.com");
    cy.get("#password").type("nebopajo123");
    cy.get("#password-confirmation").type("nebopajo123");
    cy.get(":checkbox").check();
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
});

it("Try to register with without the email", () => {
    cy.get("#first-name").type("Petar");
    cy.get("#last-name").type("Petrovic");
    cy.get("#password").type("nebopajo123");
    cy.get("#password-confirmation").type("nebopajo123");
    cy.get(":checkbox").check();
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
});

it("Try to register with without the password", () => {
    cy.get("#first-name").type("Petar");
    cy.get("#last-name").type("Petrovic");
    cy.get("#email").type("nebopajo2@gmail.com");
    cy.get("#password-confirmation").type("nebopajo123");
    cy.get(":checkbox").check();
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
});

it("Try to register without confirming the password", () => {
    cy.get("#first-name").type("Petar");
    cy.get("#last-name").type("Petrovic");
    cy.get("#email").type("nebopajo2@gmail.com");
    cy.get("#password").type("nebopajo123");
    cy.get(":checkbox").check();
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
});

it("Try to register without checking the checkbox", () => {
    cy.get("#first-name").type("Petar");
    cy.get("#last-name").type("Petrovic");
    cy.get("#email").type("nebopajo2@gmail.com");
    cy.get("#password").type("nebopajo123");
    cy.get("#password-confirmation").type("nebopajo123");
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
    cy.get(".alert").should("be.visible");
});

it("Try to register with invalid email", () => {
    cy.get("#first-name").type("Petar");
    cy.get("#last-name").type("Petrovic");
    cy.get("#email").type(randomInvalidEmail);
    cy.get("#password").type("nebopajo123");
    cy.get("#password-confirmation").type("nebopajo123");
    cy.get(":checkbox").check();
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
    //   cy.get(".alert").should("be.visible");
});

it("Try to register with an already registered email", () => {
    cy.get("#first-name").type("Petar");
    cy.get("#last-name").type("Petrovic");
    cy.get("#email").type("nadjlukac.test@gmail.com");
    cy.get("#password").type("nebopajo123");
    cy.get("#password-confirmation").type("nebopajo123");
    cy.get(":checkbox").check();
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
    //    cy.get(".alert").should("be.visible");
});

it("Try to register with invalid password", () => {
    cy.log("Password with 7 characters (No digit)");
    cy.get("#first-name").type("Petar");
    cy.get("#last-name").type("Petrovic");
    cy.get("#email").type("nebopajo2@gmail.com");
    cy.get("#password").type("nebopaj");
    cy.get("#password-confirmation").type("nebopaj");
    cy.get(":checkbox").check();
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
    //    cy.get(".alert").should("be.visible");

    cy.log("Password with 7 characters (1 digit)");
    cy.get("#password").clear();
    cy.get("#password").type("nebopa1");
    cy.get("#password-confirmation").clear();
    cy.get("#password-confirmation").type("nebopa1");
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
    //    cy.get(".alert").should("be.visible");

    cy.log("Password with 8 characters (No digit)");
    cy.get("#password").clear();
    cy.get("#password").type("nebopajo");
    cy.get("#password-confirmation").clear();
    cy.get("#password-confirmation").type("nebopajo");
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 3);
    cy.url().should("not.contain", "/logout");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/register");
    //   cy.get(".alert").should("be.visible");
});

it("Successfull registration", () => {
    cy.get("#first-name").type("Petar");
    cy.get("#last-name").type("Petrovic");
    cy.get("#email").type(randomEmail);
    cy.get("#password").type("nebopajo123");
    cy.get("#password-confirmation").type("nebopajo123");
    cy.get(":checkbox").check();
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 4);
    cy.url().should("not.contain", "/login");
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/");
});
