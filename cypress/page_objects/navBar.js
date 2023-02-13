class NavBar {
    get allGalleriesLink() {
        return cy.get("a[href='/']").contains("All Galleries");
    }

    get loginLink() {
        return cy.get("a[href='/login']");
    }

    get registerLink() {
        return cy.get("a[href='/register']");
    }

    get myGalleriesLink() {
        return cy.get("a[href='/my-galleries']");
    }

    get createGalleryLink() {
        return cy.get("a[href='/create']");
    }

    get logoutLink() {
        return cy.get("button").contains("Logout");
    }
}

export const navBar = new NavBar();
