class AllGalleriesPage {
    get allGalleriesHeading() {
        return cy.get("h1");
    }

    get filterInput() {
        return cy.get("input");
    }

    get filterBtn() {
        return cy.get("button").first();
    }

    get loadMoreBtn() {
        return cy.get("button").last();
    }

    get singleGallery() {
        return cy.get(".cell").first();
    }

    get singleGalleryHeading() {
        return this.singleGallery.find("h2");
    }

    get allGalleriesGrid() {
        return cy.get(".grid").children();
    }

    get galleryTitle() {
        return getGalleryTitle((index) =>
            cy.get("a[class='box-title']").eq(index)
        );
    }

    get galleryAuthor() {
        return getGalleryAuthor((index) =>
            cy.get("a[class='box-title']").eq(index)
        );
    }

    search(searchTerm) {
        this.filterInput.type(searchTerm);
        this.filterBtn.click();
    }
}

export const allGalleriesPage = new AllGalleriesPage();
