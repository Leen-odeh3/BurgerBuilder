/// <reference types="cypress" />
describe('Create Orders Flow', () => {
  before(() => {
    cy.fixture('loginData').then((userData) => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      const password = userData.validUser.password;
      Cypress.env('registeredEmail', uniqueEmail);
      Cypress.env('password', password);
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should display current price correctly', () => {
    cy.contains('Current Price: 4.00').should('be.visible');
  });

  it('should have SIGN UP TO ORDER button disabled initially', () => {
    cy.contains('button', 'SIGN UP TO ORDER').should('be.disabled');
  });

  it('should enable SIGN UP TO ORDER button when price > 4.00', () => {
    cy.contains('Salad').parent().contains('button', 'More').click();
    cy.contains('button', 'SIGN UP TO ORDER').should('not.be.disabled');
  });

  it('should create an order after filling contact data', () => {
    cy.contains('Salad').parent().contains('button', 'More').click();
    cy.contains('button', 'SIGN UP TO ORDER').should('not.be.disabled').click();

    cy.url().should('include', '/auth');
    cy.registerUser(Cypress.env('registeredEmail'), Cypress.env('password')).then(() => {
      cy.wait(2000);
cy.contains('button', 'CONTINUE').scrollIntoView().click({ force: true });
      cy.contains('button', 'CONTINUE').click({ force: true });
      cy.contains('We hope it tastes well!').should('be.visible');
      cy.get('form', { timeout: 10000 }).should('exist');
      cy.contains('h4', 'Enter your Contact Data').should('be.visible');
      cy.getById('name').should('exist').and('be.visible').type('John Doe');
      cy.getById('street').should('be.visible').type('123 Main St');
      cy.getById('zipCode').should('be.visible').type('12345');
      cy.getById('country').should('be.visible').type('USA');
      cy.getById('email').should('be.visible').type(Cypress.env('registeredEmail'));
      cy.getById('deliveryMethod').should('be.visible').select('fastest');
      cy.contains('button', 'ORDER').should('not.be.disabled').click();
      cy.contains('a', 'Orders').click();
      cy.url().should('include', '/orders');
      cy.contains('Ingredients:').should('be.visible');
      cy.contains('bacon (0)').should('be.visible');
      cy.contains('cheese (0)').should('be.visible');
      cy.contains('meat (0)').should('be.visible');
      cy.contains('salad (1)').should('be.visible');
      cy.contains('Price: USD 5.00').should('be.visible');
    });
  });
});
