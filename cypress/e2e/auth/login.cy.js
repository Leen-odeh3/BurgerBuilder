/// <reference types="cypress" />
import { loginSetup } from '../../support/utilities/hooks'

describe('Login User Test', () => {
  beforeEach(() => {
    loginSetup();
  });

  it('Validate the user login with valid credentials', function () {
    cy.fixture('loginData').then((userData) => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      const password = userData.validUser.password;

      cy.getByHref('/auth').first().click();
      cy.getById('email').type(uniqueEmail);
      cy.getById('password').type(password);
      cy.contains('button', 'SUBMIT').click();

      cy.url().should('not.include', '/auth');
      cy.contains('a','Orders').should('be.visible');

      cy.contains('a', 'Logout').click();
      cy.url().should('include', '/');

      cy.getByHref('/auth').first().click();
      cy.contains('button', 'SWITCH TO SIGNIN').click();
      cy.getById('email').type(uniqueEmail);
      cy.getById('password').type(password);
      cy.contains('button', 'SUBMIT').click();

      cy.wait(3000);
      cy.contains('a','Orders').should('be.visible');
      cy.contains('a', 'Logout').should('be.visible');
      cy.url().should('not.include', '/auth');

      cy.contains('a', 'Logout').click();
      cy.location('pathname').should('eq', '/');    
    });
  });

  it('Validate show error message on login with invalid credentials', function () {
    cy.fixture('loginData').then((userData) => {
      cy.getByHref('/auth').first().click();
      cy.contains('button', 'SWITCH TO SIGNIN').click();

      cy.getById('email').type(userData.invalidUser.email);
      cy.getById('password').type(userData.invalidUser.password);
      cy.contains('button', 'SUBMIT').click();

      cy.contains('EMAIL_NOT_FOUND').should('be.visible'); 
      cy.url().should('include', '/auth');
    });
  });
});
