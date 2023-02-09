const locators = require("../fixtures/locators.json");

describe("Login page case", () => {
  let userData = {
    firstName: "Stefan",
    lastName: "Nadjlukac",
    email: "nadjlukac.test@gmail.com",
    password: "testqa22test",
  };

  before(() => {
    cy.visit("/login");
    cy.get(locators.commonFormElements.emailInput).should(
      "have.attr",
      "required"
    );
    cy.get(locators.commonFormElements.emailInput)
      .should("have.attr", "type")
      .and("match", /email/);
    //    cy.get(locators.commonFormElements.emailInput)
    //     .invoke("prop", "validationMessage")
    //      .should("equal", "Please fill out this field.");
    cy.get("#password").should("have.attr", "required");
    cy.get("#password")
      .should("have.attr", "type")
      .and("match", /password/);
    //   cy.get("#password")
    //     .invoke("prop", "validationMessage")
    //     .should("equal", "Please fill out this field.");
  });

  beforeEach(() => {
    cy.visit("/login");
  });

  it("Try to log in with blank fields", () => {
    cy.get("input:invalid").should("have.length", 2);
    cy.get("button").click();
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/login");
    cy.should("not.contain", "Logout");
  });

  it("Try to log in without email", () => {
    cy.get(locators.commonFormElements.passwordInput).type(userData.password);
    cy.get("input:invalid").should("have.length", 1);
    cy.get(locators.commonFormElements.submitButton).click();
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/login");
    cy.should("not.contain", "Logout");
  });

  it("Try to log in without password", () => {
    cy.get(locators.commonFormElements.emailInput).type(userData.email);
    //    cy.get(locators.commonFormElements.passwordInput)
    //      .invoke("prop", "validationMessage")
    //      .should("equal", "Please fill out this field.");
    cy.get("input:invalid").should("have.length", 1);
    cy.get(locators.commonFormElements.submitButton).click();
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/login");
    cy.should("not.contain", "Logout");
  });

  it("Try to log in with invalid email", () => {
    cy.get("#email").type("nadjlukac.testgmail.com");
    cy.get("#email")
      .invoke("prop", "validationMessage")
      .should(
        "equal",
        "Please include an '@' in the email address. 'nadjlukac.testgmail.com' is missing an '@'."
      );
    cy.get("#password").type("testqa22test");
    cy.get("input:invalid").should("have.length", 1);
    cy.get("button").click();
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/login");
    cy.should("not.contain", "Logout");
  });

  it("Try to log in with invalid password", () => {
    cy.get("#email").type("nadjlukac.test@gmail.com");
    cy.get("#password").type("testqa22");
    cy.get("button").click();
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/login");
    cy.should("not.contain", "Logout");
    cy.get(".alert").should("be.visible");
  });

  it("Try to log in with a non-registered email", () => {
    cy.get("#email").type("nadjlukacs@gmail.com");
    cy.get("#password").type("testqa22test");
    cy.get("button").click();
    cy.url().should("equal", "https://gallery-app.vivifyideas.com/login");
    cy.should("not.contain", "Logout");
    cy.get(".alert").should("be.visible");
  });

  it("Successfull login", () => {
    cy.get("#email").type("nadjlukac.test@gmail.com");
    cy.get("#password").type("testqa22test");
    cy.get("button").click();
    cy.get(".nav-link").should("have.length", 4);
    cy.url().should("not.contain", "Login");
  });
});
