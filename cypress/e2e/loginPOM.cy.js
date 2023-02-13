/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage";
import { navBar } from "../page_objects/navBar";
import { faker } from "@faker-js/faker";

const credentials = {
    validEmail: "nadjlukac.test@gmail.com",
    validPassword: "testqa22test",
    invalidEmail: faker.internet.email(),
    invalidPassword: faker.lorem.word(),
};

describe("Login tests", () => {
    beforeEach("visit app and click the login link", () => {
        cy.visit("/");
        navBar.loginLink.click();
        cy.url().should("include", "/login");
        loginPage.loginPageHeading
            .should("be.visible")
            .and("have.text", "Please login");
    });

    it("Login with invalid credentials", () => {
        loginPage.login(credentials.invalidEmail, credentials.invalidPassword);
        cy.url().should("include", "/login");
        loginPage.errorMessage
            .should("be.visible")
            .and("have.text", "Bad Credentials")
            .and("have.css", "background-color", "rgb(248, 215, 218)")
            .and("have.class", "alert-danger");
    });

    it("Login with valid credentials", () => {
        loginPage.login(credentials.validEmail, credentials.validPassword);
        cy.url().should("not.include", "/login");
    });
});
