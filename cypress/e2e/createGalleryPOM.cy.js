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
                // cy.document().its("localStorage").should("contain", "token");
                // cy.getCookie("token").should("exist");
                // expect(localStorage.getItem('token')).to.exist;

                // hocu da proverim da li postoji token kada se ulogujem
                // skontao sam da se nalazi u Local Storage, ali ne znam kako da mu pristupim
                // jel mozda treba da instaliram Local Storage Commands da bi mogao ovo da radim?
                cy.visit("/create");
                createGalleryPage.createGalleryHeading
                    .should("be.visible")
                    .and("exist")
                    .and("have.text", "Create Gallery")
                    .and("have.class", "title-style");
                cy.url().should("contain", "/create");
                cy.get("form").find("input").should("have.length", 3);
                cy.get("input")
                    .first()
                    .invoke("prop", "validationMessage")
                    .should("equal", "Please fill out this field.");
                cy.get("input").eq(1).should("not.have.attr", "required");
                cy.get("input")
                    .last()
                    .invoke("prop", "validationMessage")
                    .should("equal", "Please fill out this field.");
                cy.get("button")
                    .eq(-2)
                    .should("have.css", "background-color", "rgb(72, 73, 75)");
                // ako ostavim sve ove asertacije u session-u, one ce biti proverene samo jednom i bice zapamcene, jel da?
                // sto bi znacilo da ih nece proveravati pre svakog testa, iako stoje u BeforeEach?
                // takodje, to bi znacilo da session mogu da posmatram kao Before koji se nalazi u BeforeEach? :D

                // ali za session se u rezultatima ne prikazuje nista sta je radjeno u njemu, vec samo pise "Created"
                // ili, ako neka asertacija ne prodje - session ne uspeva i sve se obustavlja...
                // ako pise samo "Created", to znaci da nemam dokaz u rezultatima da su proverene asertacije?
                // ili je dovoljan dokaz sto je uspesno napravljen session?
                // sta ti kazes, di da metim sve ove asertacije?
            },
            {
                cacheAcrossSpecs: true,
                // ako ovo napisem, to znaci da ce cookies iz ovog sesion-a biti sacuvani za sve test suite u ovom projektu?
                // ako je to moguce, to bi znacilo da je dovoljno da napravimo "Log in" session samo za login_page.cy.js
                // i npr sada ovde ne bi morali da pravimo sesion, nego bi smo vec bili ulogovani?
                // ali ne znam za mogucnost pokretanja svih suita odjednom...
            }
        );
        // na poslednjem predavanju se kolegi desio problem da mu nisu hteli da se ucitaju testovi
        // imao je npr. u beforeEach "cy.visit("/create")" i nakon toga nista.. nikakve asertacije
        // ti si zatim ubacio neku nasumicnu asertaciju, valjda da se dobije na vremenu da se ucita stranica pre izvrsavanja testova...
        // zapravo, nije mi bas najjasnije u kom slucaju moze da nastane taj problem da nam se testovi nece ucitati?
        // daj mi neki link da proucim to, ili objasni ukratko
        cy.visit("/create");
    });

    // sredio sam funkciju, jel sad dobro?
    // imas li mozda jos neku preporuku?
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
        cy.get("form").find("input").should("have.length", 5);
        cy.get("input").eq(1).and("not.have.attr", "required");
    });
    //ovde sam na random nabacao razne asertacije... domaci...

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
