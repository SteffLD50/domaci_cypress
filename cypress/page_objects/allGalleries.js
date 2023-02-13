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

    get galleryTitle1() {
        return cy.get("a[class='box-title']").eq(0);
    }
    get galleryTitle2() {
        return cy.get("a[class='box-title']").eq(2);
    }
    get galleryTitle3() {
        return cy.get("a[class='box-title']").eq(4);
    }
    get galleryTitle4() {
        return cy.get("a[class='box-title']").eq(6);
    }
    get galleryTitle5() {
        return cy.get("a[class='box-title']").eq(8);
    }
    get galleryTitle6() {
        return cy.get("a[class='box-title']").eq(10);
    }
    get galleryTitle7() {
        return cy.get("a[class='box-title']").eq(12);
    }
    get galleryTitle8() {
        return cy.get("a[class='box-title']").eq(14);
    }
    get galleryTitle9() {
        return cy.get("a[class='box-title']").eq(16);
    }
    get galleryTitle10() {
        return cy.get("a[class='box-title']").eq(18);
    }

    get galleryAuthor1() {
        return cy.get("a[class='box-title']").eq(1);
    }
    get galleryAuthor2() {
        return cy.get("a[class='box-title']").eq(3);
    }
    get galleryAuthor3() {
        return cy.get("a[class='box-title']").eq(5);
    }
    get galleryAuthor4() {
        return cy.get("a[class='box-title']").eq(7);
    }
    get galleryAuthor5() {
        return cy.get("a[class='box-title']").eq(9);
    }
    get galleryAuthor6() {
        return cy.get("a[class='box-title']").eq(11);
    }
    get galleryAuthor7() {
        return cy.get("a[class='box-title']").eq(13);
    }
    get galleryAuthor8() {
        return cy.get("a[class='box-title']").eq(15);
    }
    get galleryAuthor9() {
        return cy.get("a[class='box-title']").eq(17);
    }
    get galleryAuthor10() {
        return cy.get("a[class='box-title']").eq(19);
    }
  }
  
  export const allGalleriesPage = new AllGalleriesPage();
  