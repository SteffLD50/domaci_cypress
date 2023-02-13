/// reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage";
import { createGalleryPage } from "../page_objects/createGalleryPage";
import { faker } from "@faker-js/faker";
import { navBar } from "../page_objects/navBar";
import { allGalleriesPage } from "../page_objects/allGalleries";

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
    beforeEach("Log in and go to the 'Create Gallery' page", () => {
        cy.visit("/login");
        loginPage.login(credentials.email, credentials.password);
        cy.url().should("not.include", "/login");
        navBar.createGalleryLink.click();
        createGalleryPage.createGalleryHeading
            .should("be.visible")
            .and("have.text", "Create Gallery");
    });

    // vidim da ne mogu da izostavim argument u funkciji "createGallery()"
    // jel ok ovo sto radim ispod, ili ima bolji nacin?
    it("Try to create a gallery without title", () => {
        createGalleryPage.createGallery(
            galleryInputs.randomTitle,
            galleryInputs.randomDescription,
            galleryInputs.randomImageUrl1,
            galleryInputs.randomImageUrl2,
            galleryInputs.randomImageUrl3
        );
        createGalleryPage.titleInput.clear();
        createGalleryPage.clickSubmitBtn();
        cy.url().should("contain", "/create");
        cy.contains("Add image");
    });

    it("Try to create a gallery without description", () => {
        createGalleryPage.createGallery(
            galleryInputs.randomTitle,
            galleryInputs.randomDescription,
            galleryInputs.randomImageUrl1,
            galleryInputs.randomImageUrl2,
            galleryInputs.randomImageUrl3
        );
        createGalleryPage.descriptionInput.clear();
        cy.get("input:invalid").should("have.length", 0);
        createGalleryPage.clickSubmitBtn();
        cy.url().should("not.contain", "/create");
        cy.get("input").should("have.length", 1);
        cy.get("div[class='cell']").should("have.length", 10);
    });

    it("Try to create a gallery without image", () => {
        createGalleryPage.createGallery(
            galleryInputs.randomTitle,
            galleryInputs.randomDescription,
            galleryInputs.randomImageUrl1,
            galleryInputs.randomImageUrl2,
            galleryInputs.randomImageUrl3
        );
        createGalleryPage.deleteImageBtn1.click().click();
        createGalleryPage.imageUrl1Input.clear();
        createGalleryPage.clickSubmitBtn();
        cy.url().should("contain", "/create");
        cy.contains("Add image");
    });

    it("Create a valid new gallery", () => {
        createGalleryPage.createGallery(
            galleryInputs.randomTitle,
            galleryInputs.randomDescription,
            galleryInputs.randomImageUrl1,
            galleryInputs.randomImageUrl2,
            galleryInputs.randomImageUrl3
        );
        createGalleryPage.clickSubmitBtn();
    });
});
