/// <reference types="Cypress" />

import { navBar } from "../page_objects/navBar";
import { loginPage } from "../page_objects/loginPage";
import { allGalleriesPage } from "../page_objects/allGalleries";
import { createGalleryPage } from "../page_objects/createGalleryPage";
import { faker } from "@faker-js/faker";

const galleryInputs = {
    randomTitle: faker.music.songName(),
    randomDescription: faker.lorem.sentence(),
    randomImageUrl1: faker.image.imageUrl(600, 480, ".jpg"),
    randomImageUrl2: faker.image.imageUrl(640, 400, ".jpg"),
    randomImageUrl3: faker.image.imageUrl(740, 480, ".jpg"),
};

const credentials = {
    email: "nadjlukac.test@gmail.com",
    password: "testqa22test",
};

describe("Create Gallery tests", () => {
    before(() => {
        cy.loginThroughBackend();
        cy.visit("/create");
        createGalleryPage.createGalleryHeading
            .should("be.visible")
            .and("exist")
            .and("have.text", "Create Gallery")
            .and("have.class", "title-style")
            .and("have.css", "text-transform", "uppercase")
            .and(
                "have.css",
                "font-family",
                "Avenir, Helvetica, Arial, sans-serif"
            )
            .and("have.css", "color", "rgb(72, 73, 75)");
        cy.url().should("contain", "/create");
        cy.get("form").find("input").should("have.length", 3);
        createGalleryPage.titleInput
            .invoke("prop", "validationMessage")
            .should("equal", "Please fill out this field.");
        createGalleryPage.descriptionInput.should("not.have.attr", "required");
        createGalleryPage.imageUrlInput1
            .invoke("prop", "validationMessage")
            .should("equal", "Please fill out this field.");
        createGalleryPage.submitBtn.should(
            "have.css",
            "background-color",
            "rgb(72, 73, 75)"
        );
    });

    beforeEach(() => {
        // cy.session("Log in", () => {
        //     cy.visit("/login");
        //     loginPage.login(credentials.email, credentials.password);
        //     cy.url().should("not.include", "/login");
        // });
        cy.loginThroughBackend();
        cy.visit("/create");
    });

    it("Try to create a gallery without title", () => {
        createGalleryPage.createGallery(
            "",
            galleryInputs.randomDescription,
            galleryInputs.randomImageUrl1,
            galleryInputs.randomImageUrl2,
            galleryInputs.randomImageUrl3
        );
        cy.url().should("contain", "/create");
        createGalleryPage.allInputs.should("have.length", 5);
    });

    it("Try to create a gallery without description", () => {
        cy.intercept("POST", `${Cypress.env("apiUrl")}/galleries`).as(
            "createValidGallery"
        );
        createGalleryPage.createGallery(
            galleryInputs.randomTitle,
            "",
            galleryInputs.randomImageUrl1,
            galleryInputs.randomImageUrl2,
            galleryInputs.randomImageUrl3
        );
        allGalleriesPage.allGalleriesHeading
            .should("be.visible")
            .and("exist")
            .and("have.text", "All Galleries");
        cy.url().should("not.contain", "/create");
        allGalleriesPage.filterInput.should("be.visible").and("exist");
        cy.wait("@createValidGallery").then((request) => {
            expect(request.response.statusCode).to.eql(201);
        });
    });

    it("Try to create a gallery without image", () => {
        createGalleryPage.createGallery(
            galleryInputs.randomTitle,
            galleryInputs.randomDescription,
            ""
        );
        createGalleryPage.createGalleryHeading
            .should("be.visible")
            .and("exist")
            .and("have.text", "Create Gallery");
        cy.url().should("contain", "/create");
        createGalleryPage.allInputs.should("have.length", 3);
    });

    it("Create a valid new gallery", () => {
        cy.intercept("POST", `${Cypress.env("apiUrl")}/galleries`).as(
            "createValidGallery"
        );
        createGalleryPage.createGallery(
            galleryInputs.randomTitle,
            galleryInputs.randomDescription,
            galleryInputs.randomImageUrl1,
            galleryInputs.randomImageUrl2,
            galleryInputs.randomImageUrl3
        );
        allGalleriesPage.allGalleriesHeading
            .should("be.visible")
            .and("exist")
            .and("have.text", "All Galleries");
        cy.url().should("not.contain", "/create");
        allGalleriesPage.filterInput.should("be.visible").and("exist");
        cy.wait("@createValidGallery").then((request) => {
            expect(request.response.statusCode).to.eql(201);
        });
    });

    it("Delete gallery", () => {
        cy.intercept("DELETE", `${Cypress.env("apiUrl")}/galleries/**`).as(
            "deleteGallery"
        );
        navBar.myGalleriesLink.click();
        cy.get("h1").should("have.text", "My Galleries");
        cy.get(".grid").find("a").eq(0).click();
        cy.get(".carousel-caption").should("exist").and("be.visible");
        cy.get("button").first().click();
        // cy.on("window:confirm", () => {
        //     return true;
        // });
        cy.wait("@deleteGallery").then((request) => {
            expect(request.response.statusCode).to.eql(200);
        });
    });
});
