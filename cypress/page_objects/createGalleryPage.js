class CreateGalleryPage {
    get createGalleryHeading() {
        return cy.get("h1");
    }

    get titleInput() {
        return cy.get("#title");
    }

    get descriptionInput() {
        return cy.get("#description");
    }

    get addImageBtn() {
        return cy.get("button").eq(-3);
    }

    get imageUrlInput1() {
        return cy.get(".input-group").eq(0);
    }

    get imageUrlInput2() {
        return cy.get(".input-group").eq(1);
    }

    get imageUrlInput3() {
        return cy.get(".input-group").eq(2);
    }

    get deleteImageBtn1() {
        return this.imageUrlInput1.find("button").first();
    }

    get shiftUpImageBtn1() {
        return this.imageUrlInput1.find("button").eq(-2);
    }

    get shiftDownImageBtn1() {
        return this.imageUrlInput1.find("button").last();
    }

    get deleteImageBtn2() {
        return this.imageUrlInput2.find("button").first();
    }

    get shiftUpImageBtn2() {
        return this.imageUrlInput2.find("button").eq(-2);
    }

    get shiftDownImageBtn2() {
        return this.imageUrlInput2.find("button").last();
    }

    get deleteImageBtn3() {
        return this.imageUrlInput3.find("button").first();
    }

    get shiftUpImageBtn3() {
        return this.imageUrlInput3.find("button").eq(-2);
    }

    get shiftDownImageBtn3() {
        return this.imageUrlInput3.find("button").last();
    }

    get submitBtn() {
        return cy.get("button").eq(-2);
    }

    get cancelBtn() {
        return cy.get("button").eq(-1);
    }

    clickAddImageBtn() {
        this.addImageBtn.click();
    }

    clickDeleteImageBtn1() {
        this.deleteImageBtn1.click();
    }

    clickShiftUpImageBtn1() {
        this.shiftUpImageBtn1.click();
    }

    clickShiftDownImageBtn1() {
        this.shiftDownImageBtn1.click();
    }

    clickDeleteImageBtn2() {
        this.deleteImageBtn2.click();
    }

    clickShiftUpImageBtn2() {
        this.shiftUpImageBtn2.click();
    }

    clickShiftDownImageBtn2() {
        this.shiftDownImageBtn2.click();
    }

    clickDeleteImageBtn3() {
        this.deleteImageBtn3.click();
    }

    clickShiftUpImageBtn3() {
        this.shiftUpImageBtn3.click();
    }

    clickShiftDownImageBtn3() {
        this.shiftDownImageBtn3.click();
    }

    clickSubmitBtn() {
        this.submitBtn.click();
    }

    clickCancelBtn() {
        this.cancelBtn.click();
    }
    // nisi mi odgovorio u vezi settera, rekao sam ti da mislim da je gubljenje vremena da se prave
    // i samo mi zauzimaju mesto u kodu, pa mi je i teze da se snadjem, moram da skrolujem...
    // jel ih ti koristis?
    // lakse mi je da uzmem neki getter i samo dodam .click()... a skontao sam da na setter ne funkcionise .click()

    createGallery(title, description, imageUrl1, imageUrl2, imageUrl3) {
        if (!title) {
            this.descriptionInput.type(description);
            this.addImageBtn.click().click();
            this.imageUrlInput1.type(imageUrl1);
            this.imageUrlInput2.type(imageUrl2);
            this.imageUrlInput3.type(imageUrl3);
            this.clickSubmitBtn();
        } else if (!description) {
            this.titleInput.type(title);
            this.addImageBtn.click().click();
            this.imageUrlInput1.type(imageUrl1);
            this.imageUrlInput2.type(imageUrl2);
            this.imageUrlInput3.type(imageUrl3);
            this.clickSubmitBtn();
        } else if (!imageUrl1) {
            this.titleInput.type(title);
            this.descriptionInput.type(description);
            this.clickSubmitBtn();
        } else {
            this.titleInput.type(title);
            this.descriptionInput.type(description);
            this.addImageBtn.click().click();
            this.imageUrlInput1.type(imageUrl1);
            this.imageUrlInput2.type(imageUrl2);
            this.imageUrlInput3.type(imageUrl3);
            this.clickSubmitBtn();
        }
    }
}

export const createGalleryPage = new CreateGalleryPage();
