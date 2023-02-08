
describe('Login page case - Positive', () => {

    it('Login page layout', () => {
        cy.visit('/login')
        cy.get('input[id="email"]').should('be.visible')
        cy.get('input[id="password"]').should('be.visible')
        cy.get('button[data-v-15717af5=""]').should('be.visible').contains('Submit')
        cy.get('a[href="/"]').should('be.visible')
        cy.get('a[href="/login"]').should('be.visible')
        cy.get('a[href="/register"]').should('be.visible')
    })

    it('All Galleries link', () => {
        cy.visit('/login')
        cy.get('.nav-link').eq(0).click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/')
    })

    it('Login link', () => {
        cy.visit('/login')
        cy.get('.nav-link').eq(1).click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/login')
    })

    it('Register link', () => {
        cy.visit('/login')
        cy.get('.nav-link').eq(2).click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/register')
    })
    
    it('Successfull login', () => {
        cy.visit('/login')
        cy.get('#email').type('nadjlukac.test@gmail.com')
        cy.get('#password').type('testqa22test')
        cy.get('button').click()
        cy.get('.nav-link').should('have.length', 4)
        cy.url().should('not.contain', '/login')
        cy.get('.nav-link').eq(3).click()  // Log out
    })

})