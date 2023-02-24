/// <reference types="Cypress" />

import { allGalleriesPage } from "../page_objects/allGalleries";

describe("All Galleries page test", () => {
    beforeEach("Visit All Galleries page", () => {
        cy.loginThroughBackend();
        cy.visit("/");
    });

    it("Loads page successfully", () => {
        allGalleriesPage.allGalleriesHeading
            .should("be.visible")
            .and("exist")
            .and("have.text", "All Galleries");
        allGalleriesPage.allGalleriesGrid
            .should("be.visible")
            .and("have.length", 10);
        allGalleriesPage.singleGallery.find("img").should("be.visible");
    });

    it("Test pagination", () => {
        allGalleriesPage.allGalleriesGrid
            .should("be.visible")
            .and("have.length", 10);
        allGalleriesPage.loadMoreBtn.click();
        allGalleriesPage.allGalleriesGrid
            .should("be.visible")
            .and("have.length", 20);
    });

    it("Test search gallery", () => {
        let searchTerm = "Gallery with 2 images";
        allGalleriesPage.search(searchTerm);
        allGalleriesPage.allGalleriesGrid
            .should("be.visible")
            .and("have.length", 6);
        allGalleriesPage.singleGallery.find("a").first().click();
        cy.get("h1").should("be.visible").and("have.text", searchTerm);
    });

    it("Click on gallery title redirects to single gallery page", () => {
        allGalleriesPage.singleGallery.find("a").first().click();
        cy.get("textarea").should("be.visible");
        cy.get(".carousel-caption").should("exist");
        cy.go("back");
        allGalleriesPage.singleGallery
            .find("a")
            .first()
            .invoke("text")
            .then(($title) => {
                const text = $title.trim();
                allGalleriesPage.singleGallery.find("a").first().click();
                cy.get("h1").should(($title2) => {
                    expect($title2.text()).to.eq(text);
                }); // Da li je text imena galerije = naslov na stranici galerije
            });
    });

    it("Click on gallery author redirects to the authors gallery page", () => {
        allGalleriesPage.singleGallery.find("a").eq(1).click();
        cy.get("h1").should("include.text", "Galleries of");
        cy.get("textarea").should("not.exist");
        cy.go("back");
        allGalleriesPage.singleGallery
            .find("a")
            .eq(1)
            .then(($title) => {
                const text = $title.text().trim();
                allGalleriesPage.singleGallery.find("a").eq(1).click();
                cy.get("h1").should(($title2) => {
                    expect($title2.text().replace("  ", " ")).to.eq(
                        `Galleries of ${text}`
                    ); // Da li je text imena autora = naslov na stranici autora
                });
            });
        cy.go("back");
        allGalleriesPage.singleGallery
            .find("a")
            .eq(1)
            .then(($link) => {
                const link = $link.prop("href");
                allGalleriesPage.singleGallery.find("a").eq(1).click();
                cy.url().should(($link2) => {
                    expect($link2).to.eq(link);
                }); // Da li je "href" value autora = url stranice autora
            });
    });
});
