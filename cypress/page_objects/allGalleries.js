class AllGalleriesPage {
    get filterInput() {
        return cy.get("input");
    }

    get filterBtn() {
        return cy.get("button").eq(0);
    }

    get loadMoreBtn() {
        return cy.get("button").eq(1);
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
}

export const allGalleriesPage = new AllGalleriesPage();
