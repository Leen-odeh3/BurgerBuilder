/// <reference types="cypress" />
import { loginSetup } from '../../support/utilities/hooks';
import { authActions } from '../../pageObjects/Auth/AuthActions';
import { authAssertions } from '../../pageObjects/Auth/AuthAssertions';

describe('Login User Test', () => {
  beforeEach(() => {
    loginSetup();
  });

  it('Login with valid credentials', () => {
    cy.fixture('loginData').then(({ validUser }) => {
      const uniqueEmail = `test${Date.now()}@example.com`;
      const password = validUser.password;

      authActions
        .visitAuthPage()
        .fillEmail(uniqueEmail)
        .fillPassword(password)
        .submit()
        .logout();

      authActions
        .visitAuthPage()
        .switchToSignin()
        .fillEmail(uniqueEmail)
        .fillPassword(password)
        .submit();

      authAssertions.assertLoginSuccess();

      authActions.logout();

      authAssertions.assertOnHomePage();
    });
  });

  it('Error on login with invalid credentials', () => {
    cy.fixture('loginData').then(({ invalidUser }) => {
      authActions
        .visitAuthPage()
        .switchToSignin()
        .fillEmail(invalidUser.email)
        .fillPassword(invalidUser.password)
        .submit();

      authAssertions.assertErrorMessage('EMAIL_NOT_FOUND');
      cy.url().should('include', '/');
    });
  });

  it('Error when fields are empty', () => {
    authActions
      .visitAuthPage()
      .switchToSignin()
      .fillEmail('')
      .fillPassword('')
      .submit();

    authAssertions.assertErrorMessage('INVALID_EMAIL');
  });
});
