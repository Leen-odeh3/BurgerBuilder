// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getById', (id) => {
  return cy.get(`#${id}`)
})

Cypress.Commands.add('getByClass', (className) => {
  return cy.get(`.${className}`)
})

Cypress.Commands.add('getByHref', (href) => {
  return cy.get(`a[href="${href}"]`)
})

Cypress.Commands.add('registerUser', (email, password) => {
  cy.visit('/auth');
  cy.getById('email').type(email);
  cy.getById('password').type(password);
  cy.contains('button', 'SUBMIT').click();
  cy.contains('a', 'Logout').should('be.visible');
  cy.url().should('not.include', '/auth');
  cy.contains('a', 'Orders').should('be.visible');
});

