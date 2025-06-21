/// <reference types="cypress" />

import { orderActions } from '../../pageObjects/Order/OrderActions';

describe('Less Order Count', () => {
  beforeEach(() => {
    cy.fixture('loginData').then((userData) => {
      cy.loginUser(userData.validUser.mail, userData.validUser.password);
    });
  });
it('should have initial price 4.00 and order button disabled', () => {
  cy.contains('strong', /4\.00/);
  cy.contains('button', 'ORDER NOW').should('be.disabled');
});

  it('should add and remove meat ingredient and update total price', () => {
    orderActions.addMeatIngredient(3);
    cy.contains('strong', /7\.00/);

    cy.contains('.BuildControl_Label__TQkTk', 'Meat')
      .parent()
      .within(() => {
        cy.containsWithTag('button', 'Less').click();
        cy.containsWithTag('button', 'Less').click();
      });

    cy.contains('strong', /5\.00/);

    cy.contains('.BuildControl_Label__TQkTk', 'Meat')
      .parent()
      .within(() => {
        cy.containsWithTag('button', 'Less').should('not.be.disabled').click();
        cy.containsWithTag('button', 'Less').should('be.disabled');
      });

    cy.contains('strong', /4\.00/);
  });
});
