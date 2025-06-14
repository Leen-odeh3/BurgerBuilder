/// <reference types="cypress" />

import { registrationSetup } from '../../support/utilities/hooks'

describe('Register User Tests', () => {
  beforeEach(() => {
    registrationSetup();
  });
  
 it('should register a new user with unique email', () => {
    cy.fixture('loginData').then((userData) => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      const password = userData.validUser.password;

      cy.registerUser(uniqueEmail, password);
      
      Cypress.env('registeredEmail', uniqueEmail);
    });
  });
});
