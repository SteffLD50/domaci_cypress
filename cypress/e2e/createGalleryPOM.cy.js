import { loginPage } from "../page_objects/loginPage";
import { createGalleryPage } from "../page_objects/createGalleryPage";
import { faker } from '@faker-js/faker';
import { navBar } from "../page_objects/navBar";

const galleryInputs = {
    randomTitle: faker.music.songName(),
    randomDescription: faker.lorem.sentence(),
    randomImageUrl1: faker.image.imageUrl(600, 480, '.jpg'), // ovde sam menjao rezolucije da ne bih dobio 3 identicne slike
    randomImageUrl2: faker.image.imageUrl(640, 400, '.jpg'), // jel postoji neki bolji nacin?
    randomImageUrl3: faker.image.imageUrl(740, 480, '.jpg'),
};

const credentials = {
    email: "nadjlukac.test@gmail.com",
    password: "testqa22test",
};

describe("Create Gallery tests", () => {

  // jel mora pre svakog testa da se iznova uloguje? ili moze nekako da se samo jednom uloguje pre svih testova,
  // pa onda samo da stavim pre svakog testa "navBar.createGalleryLink.click();"
  beforeEach("Log in and go to the 'Create Gallery' page", () => {
    cy.visit("/");
    navBar.loginLink.click();
    loginPage.login(credentials.email, credentials.password);
    navBar.createGalleryLink.click();
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
