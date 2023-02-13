class CreateGalleryPage {
    get titleInput() {
        return cy.get("#title");
    }

    get descriptionInput() {
        return cy.get("#description");
    }

    get addImageBtn() {
        return cy.get("button").contains("Add image");
    }

    get deleteImageBtn1() {
        return cy.get("button[class='input-buttons']").eq(0);
    }

    get shiftUpImageBtn1() {
        return cy.get("button[class='input-buttons']").eq(1);
    }

    get shiftDownImageBtn1() {
        return cy.get("button[class='input-buttons']").eq(2);
    }

    get deleteImageBtn2() {
        return cy.get("button[class='input-buttons']").eq(3);
    }

    get shiftUpImageBtn2() {
        return cy.get("button[class='input-buttons']").eq(4);
    }

    get shiftDownImageBtn2() {
        return cy.get("button[class='input-buttons']").eq(5);
    }

    get deleteImageBtn3() {
        return cy.get("button[class='input-buttons']").eq(6);
    }

    get shiftUpImageBtn3() {
        return cy.get("button[class='input-buttons']").eq(7);
    }

    get shiftDownImageBtn3() {
        return cy.get("button[class='input-buttons']").eq(8);
    }

    get imageUrl1Input() {
        return cy.get("input[type='url']").eq(0);
    }

    get imageUrl2Input() {
        return cy.get("input[type='url']").eq(1);
    }

    get imageUrl3Input() {
        return cy.get("input[type='url']").eq(2);
    }

    get submitBtn() {
        return cy.get("button[type='submit']").eq(0);
    }

    get cancelBtn() {
        return cy.get("button[type='submit']").eq(1);
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

    createGallery(title, description, imageUrl1, imageUrl2, imageUrl3) {
        this.titleInput.type(title);
        this.descriptionInput.type(description);
        this.addImageBtn.click().click();
        this.imageUrl1Input.type(imageUrl1);
        this.imageUrl2Input.type(imageUrl2);
        this.imageUrl3Input.type(imageUrl3);
    }
}

export const createGalleryPage = new CreateGalleryPage();
