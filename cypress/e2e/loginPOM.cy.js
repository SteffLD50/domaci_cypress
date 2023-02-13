/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage";
import { navBar } from "../page_objects/navBar";

const credentials = {
  email: "nadjlukac.test@gmail.com",
  password: "testqa22test",
};

describe("login tests", () => {
  beforeEach("visit app and click the login link", () => {
    cy.visit("/");
    navBar.loginLink.click();
  });

  it("login with valid credentials", () => {
    loginPage.login(credentials.email, credentials.password);
  });
});
