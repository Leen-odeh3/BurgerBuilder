Cypress.Commands.add('getById', (id) => {
  return cy.get(`#${id}`)
})

Cypress.Commands.add('getByClass', (className) => {
  return cy.get(`.${className}`)
})

Cypress.Commands.add('getByHref', (href) => {
  return cy.get(`a[href="${href}"]`)
})

Cypress.Commands.add('containsWithTag', (tag, text) => {
  return cy.contains(tag, text);
});

Cypress.Commands.add('registerUser', (email, password) => {
  cy.wait(1000);
  cy.visit('/auth');
  cy.getById('email').type(email);
  cy.getById('password').type(password);
  cy.containsWithTag('button', 'SUBMIT').click();
  cy.containsWithTag('a', 'Logout').should('be.visible');
  cy.url().should('not.include', '/auth');
  cy.containsWithTag('a', 'Orders').should('be.visible');
});

Cypress.Commands.add('loginUser', (email, password) => {
  cy.visit('/auth');
  cy.containsWithTag('button', 'SWITCH TO SIGNIN').click();
  cy.getById('email').type(email);
  cy.getById('password').type(password);
  cy.containsWithTag('button', 'SUBMIT').click();
  cy.url().should('not.include', '/auth');
  cy.containsWithTag('a', 'Logout').should('be.visible');
  cy.containsWithTag('a', 'Orders').should('be.visible');
});