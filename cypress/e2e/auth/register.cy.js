/// <reference types="cypress" />

import { registrationSetup } from '../../support/utilities/hooks'

describe('Register User Tests', () => {
  beforeEach(() => {
    registrationSetup();
  });

  it('should register a new user with unique email', () => {
    cy.fixture('loginData').then((userData) => {
      const uniqueEmail = `test${Date.now()}@example.com`;

      cy.getByHref('/auth').first().click();
      cy.getById('email').type(uniqueEmail);
      cy.getById('password').type(userData.validUser.password);
      cy.contains('button', 'SUBMIT').click();

      cy.contains('a', 'Orders').should('be.visible');
      cy.contains('a', 'Logout').should('be.visible');
      cy.url().should('not.include', '/auth');

      Cypress.env('registeredEmail', uniqueEmail);
    });
  });
});
