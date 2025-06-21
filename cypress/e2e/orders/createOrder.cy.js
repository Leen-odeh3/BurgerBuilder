/// <reference types="cypress" />

import { orderActions } from '../../pageObjects/Order/OrderActions';
import { orderAssertions } from '../../pageObjects/Order/OrderAssertions';
import {getUniqueEmail} from '../../support/utilities/emailUtils'
describe('Create Burger Order', () => {
  beforeEach(() => {
    cy.fixture('loginData').then((userData) => {
      cy.loginUser(userData.validUser.mail, userData.validUser.password);
    });
  });

  it('should register a new user and have no orders', () => {
    cy.fixture('loginData').then((userData) => {
      const email = getUniqueEmail();
      const password = userData.validUser.password;

      cy.registerUser(email, password);

    orderActions.goToOrdersPage();
      orderAssertions.assertNoOrders();
    });
  });

  it.only('should create an order after building a burger', () => {
    cy.fixture('loginData').then(({ formData, validUser }) => {
      orderActions
        .addMeatIngredient(2)
        .clickOrderButton();

      orderAssertions.assertOrderSummaryVisible();

      orderActions.clickContinue();

      orderAssertions.assertCheckoutPage();

      orderActions
        .clickContinue()
        .fillCheckoutForm(formData, validUser.mail)
        .clickOrder();

      orderAssertions.assertOrderConfirmation();

      orderActions.goToOrdersPage();

      orderAssertions.assertOrderDetails();
    });
  });
});
