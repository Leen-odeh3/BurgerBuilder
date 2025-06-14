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

Cypress.Commands.add('loginUser', (email, password) => {
  cy.visit('/auth');
  cy.contains('button', 'SWITCH TO SIGNIN').click();
  cy.getById('email').type(email);
  cy.getById('password').type(password);
  cy.contains('button', 'SUBMIT').click();
  cy.url().should('not.include', '/auth');
  cy.contains('a', 'Logout').should('be.visible');
  cy.contains('a', 'Orders').should('be.visible');
});

