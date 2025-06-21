/// <reference types="cypress" />

import { registrationSetup } from '../../support/utilities/hooks';
import {getUniqueEmail} from '../../support/utilities/emailUtils';

describe('Register User Tests', () => {
  beforeEach(() => {
    registrationSetup();
  });
  
 it('should register a new user with unique email', () => {
    cy.fixture('loginData').then((userData) => {
      const email = getUniqueEmail();
      const password = userData.validUser.password;

      cy.registerUser(email, password);
      
    });
  });
});
