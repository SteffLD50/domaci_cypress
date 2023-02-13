/// <reference types="Cypress" />

import { allGalleriesPage } from "../page_objects/allGalleries";
import { loginPage } from "../page_objects/loginPage";

const credentials = {
    email: "nadjlukac.test@gmail.com",
    password: "testqa22test",
};

describe("All Galleries page test", () => {
    beforeEach("Visit app and login", () => {
        cy.visit("/login");
        loginPage.login(credentials.email, credentials.password);
        cy.url().should("not.include", "/login");
    });

    // it("Loads page successfully", () => {
    //     cy.get(".cell").should("have.length", 10);
    //     allGalleriesPage.allGalleriesHeading
    //         .should("be.visible")
    //         .and("exist")
    //         .and("have.text", "All Galleries");

    //     allGalleriesPage.allGalleries
    //         .should("be.visible")
    //         .and("have.length", 10);

    //     allGalleriesPage.singleGallery.find("img").should("be.visible");
    // });
    it("Test pagination", () => {
        allGalleriesPage.allGalleries
            .should("be.visible")
            .and("have.length", 10);
        allGalleriesPage.loadMoreBtn.click();
        allGalleriesPage.allGalleries
            .should("be.visible")
            .and("have.length", 20);
    });

    it("Test search", () => {
        let searchTerm = "Gallery with 2 images";
        allGalleriesPage.search(searchTerm);
        allGalleriesPage.allGalleries
            .should("be.visible")
            .and("have.length", 6);
        allGalleriesPage.singleGallery.find("a").first().click();
        cy.get("h1").should("be.visible").and("have.text", searchTerm);
    });

    it("Click on gallery title redirects to single gallery page", () => {
        allGalleriesPage.singleGallery.find("a").first().click();
    });

    it("Click on gallery author redirects to the authors gallery page", () => {
        allGalleriesPage.singleGallery.find("a").first().click();
    });
});
