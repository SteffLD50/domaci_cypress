/// <reference types="Cypress" />

import { navBar } from "../page_objects/navBar";
import { registerPage } from "../page_objects/registerPage";
import { faker } from "@faker-js/faker";

describe("Register test", () => {
    let userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: `${faker.lorem.word(8)}1`,
        shortPassword: `${faker.lorem.word(3)}1`,
        passwordWithoutNumber: `${faker.lorem.word(8)}`,
        invalidEmail: "testmail.com",
    };

    before("Visit app and click on the register link", () => {
        cy.visit("/");
        navBar.registerLink.click();
        cy.url().should("contain", "/register");
    });

    it("Register with valid data", () => {
        cy.registerViaBackend(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password
        );
        cy.url().should("not.contain", "/register");
        cy.visit("/login");
        loginPage.login(userData.email, userData.password);
    });
});
