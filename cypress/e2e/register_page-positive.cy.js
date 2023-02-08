
describe('Register page case', () => {

    it('Register page layout', () => {
        cy.visit('/register')
        cy.get('input[id="first-name"]').should('be.visible')
        cy.get('input[id="last-name"]').should('be.visible')
        cy.get('input[id="email"]').should('be.visible')
        cy.get('input[id="password"]').should('be.visible')
        cy.get('input[id="password-confirmation"]').should('be.visible')
        cy.get('input[type="checkbox"]').should('be.visible')
        cy.get('button').should('be.visible').contains('Submit')
        cy.get('a[href="/"]').eq(1).should('be.visible')
        cy.get('a[href="/login"]').should('be.visible')
        cy.get('a[href="/register"]').should('be.visible')
    })

    it('All Galleries link', () => {
        cy.visit('/register')
        cy.get('.nav-link').eq(0).click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/')
    })

    it('Login link', () => {
        cy.visit('/register')
        cy.get('.nav-link').eq(1).click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/login')
    })

    it('Register link', () => {
        cy.visit('/register')
        cy.get('.nav-link').eq(2).click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/register')
    })

    it('Password must have at least 8 characters (1 of them a digit)', () => {
        cy.visit('/register')
        cy.get('#password').should('have.attr', 'required')
        cy.get('#password').should('have.attr', 'type').and('match', /password/)
        cy.get('#password').type('nebopaj2')
        cy.get('#password').invoke('prop', 'validationMessage')
            .should('equal', "")
        // jel ovde moram da popunjavam sva polja i da pritisnem Submit da bih proverio ispravnost? Ili je i ovako dobro?
    })
    
    it('Successfull registration', () => {
        cy.visit('/register')
        cy.get('#first-name').type('Petar')
        cy.get('#last-name').type('Petrovic')
        cy.get('#email').type('nebopajo1@gmail.com')  // uradio sam test, bilo je sve ok, ali sada je zauzet mejl
        cy.get('#password').type('nebopajo123')
        cy.get('#password-confirmation').type('nebopajo123')
        cy.get(':checkbox').check()
        cy.get('button').click()
        cy.get('.nav-link').should('have.length', 4)
        cy.url().should('not.contain', '/login')
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/')
    })
})
