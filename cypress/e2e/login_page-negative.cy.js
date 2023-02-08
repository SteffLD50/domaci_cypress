
describe('Login page case - Negative', () => {

    before(() => {
        cy.visit("/login")
        cy.get('#email').should('have.attr', 'required')
        cy.get('#email').should('have.attr', 'type').and('match', /email/)
        cy.get('#email').invoke('prop', 'validationMessage')
            .should('equal', "Please fill out this field.")
        cy.get('#password').should('have.attr', 'required')
        cy.get('#password').should('have.attr', 'type').and('match', /password/)
        cy.get('#password').invoke('prop', 'validationMessage')
            .should('equal', "Please fill out this field.")
    })

    beforeEach(() => {
        cy.visit("/login")
    })

    it('Log in with blank fields', () => {
        cy.get('input:invalid').should('have.length', 2)
        cy.get('button').click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/login')
        cy.should('not.contain', 'Logout')
    })

    it('Log in with no email', () => {
        cy.get('#password').type('testqa22test')
        cy.get('input:invalid').should('have.length', 1)
        cy.get('button').click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/login')
        cy.should('not.contain', 'Logout')
    })

    it('Log in with no password', () => {
        cy.get('#email').type('nadjlukac.test@gmail.com')
        cy.get('#password').invoke('prop', 'validationMessage')
            .should('equal', "Please fill out this field.")
        cy.get('input:invalid').should('have.length', 1)
        cy.get('button').click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/login')
        cy.should('not.contain', 'Logout')
    })

    it('Log in with invalid email', () => {
        cy.get('#email').type('nadjlukac.testgmail.com')
        cy.get('#email').invoke('prop', 'validationMessage')
            .should('equal', "Please include an '@' in the email address. 'nadjlukac.testgmail.com' is missing an '@'.")
        cy.get('#password').type('testqa22test')
        cy.get('input:invalid').should('have.length', 1)
        cy.get('button').click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/login')
        cy.should('not.contain', 'Logout')
    })

    it('Log in with invalid password', () => {
        cy.get('#email').type('nadjlukac.test@gmail.com')
        cy.get('#password').type('testqa22')
        cy.get('button').click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/login')
        cy.should('not.contain', 'Logout')
        cy.get('.alert').should('be.visible')
    })

    it('Log in with a non-registered email', () => {
        cy.get('#email').type('nadjlukacs@gmail.com')
        cy.get('#password').type('testqa22test')
        cy.get('button').click()
        cy.url().should('equal', 'https://gallery-app.vivifyideas.com/login')
        cy.should('not.contain', 'Logout')
        cy.get('.alert').should('be.visible')
    })

    it('Successfull login', () => {
        cy.get('#email').type('nadjlukac.test@gmail.com')
        cy.get('#password').type('testqa22test')
        cy.get('button').click()
        cy.get('.nav-link').should('have.length', 4)
        cy.url().should('not.contain', 'Login')
    })
/*
Jel smem ovako da uradim npr. grupu test kejseva? Odnosno da pokrijem vise test kejseva kroz jedan veci test?
Ili moram da radim svaki posebno kako je i zapisan?
Kontam da je ovo brze i u smislu pisanja i u smislu pokretanja testova...

    it("Log in with invalid email", () => {
        cy.visit("/login")
        cy.get('form[data-v-15717af5]').within(() => {
            cy.get('#email').invoke('prop', 'validationMessage')
              .should('equal', 'Please fill out this field.')
            cy.get('#email').type('nadjlukac.testgmail.com')
            cy.get('#email').invoke('prop', 'validationMessage')
              .should('equal', "Please include an '@' in the email address. 'nadjlukac.testgmail.com' is missing an '@'.")
            cy.get('#email').clear().type('nadjlukac.test@gmail')
            cy.get('#email').invoke('prop', 'validationMessage')
            .should('equal', "Please include a '.com' in the email address. 'nadjlukac.test@gmail' is missing a '.com'.")
            cy.get('#email').clear().type('nadjlukac.test@gmail.com')
            cy.get('#email').invoke('prop', 'validationMessage')
              .should('equal', '')
        })
    })
*/
})
