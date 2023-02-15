/// <reference types="Cypress" />

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
    beforeEach(() => {
        cy.session(
            "Log in",
            () => {
                cy.visit("/login");
                loginPage.login(credentials.email, credentials.password);
                cy.url().should("not.include", "/login");
                //    cy.document().its("cookie").should("contain", "_TCC");
                // ne kontam zasto ovo ne radi
                // u uputstvu sam gledao da se time proverava da li postoji token u cookies...
                // doduse, ja nisam nasao da pise token, bilo je ponudjeno 6-7, pa sam izabrao samo ovaj jedan "_TCC"
            },
            {
                cacheAcrossSpecs: true,
                // ako ovo napisem, to znaci da ce cookies iz ovog sesion-a biti sacuvani za sve test suite u ovom projektu?
            }
        );
        // ove 2 asertacije su namerno van "session" jer je ipak pre izvrsavanja svakog testa
        // potrebno malo vremena, odnosno da dobijemo na vremenu da bi se ucitao test
        // jel treba tako? jesam li dobro razumeo ono sto si pricao na casu?
        // ili to radimo samo u slucaju kada iskrsne problem?
        cy.visit("/create");
        createGalleryPage.createGalleryHeading
            .should("be.visible")
            .and("have.text", "Create Gallery");
    });

    // sredio sam funkciju, jel sad dobro?
    // ili imas jos nesto da me posavetujes?
    it("Try to create a gallery without title", () => {
        createGalleryPage.createGallery(
            "",
            galleryInputs.randomDescription,
            galleryInputs.randomImageUrl1,
            galleryInputs.randomImageUrl2,
            galleryInputs.randomImageUrl3
        );
        createGalleryPage.createGalleryHeading
            .should("be.visible")
            .and("exist")
            .and("have.text", "Create Gallery");
        cy.url().should("contain", "/create");
        cy.get("input").should("have.length", 5);
    });

    it("Try to create a gallery without description", () => {
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
        cy.get("input").should("have.length", 1);
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
        cy.get("input").should("have.length", 3);
    });

    it("Create a valid new gallery", () => {
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
        cy.get("input").should("have.length", 1);
    });
});
