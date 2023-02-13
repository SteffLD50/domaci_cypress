/// <reference types="Cypress" />

import { navBar } from "../page_objects/navBar";
import { registerPage } from "../page_objects/registerPage";

describe("Register test", () => {
    let userData = {
        firstName: "Stefan",
        lastName: "Nadjlukac",
        email: "nadjlukac.test@gmail.com",
        password: "testqa22test",
        shortPassword: "pass",
        invalidEmail: "testmail.com",
    };

    before("visit app and click on the register link", () => {
        cy.visit("/");
        navBar.registerLink.click();
        cy.url().should("contain", "/register");
    });

    it("register with valid data", () => {
        registerPage.registerWithValidData(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password
        );
        cy.url().should("not.contain", "/register");
    });
});
