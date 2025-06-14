/// <reference types="cypress" />

describe('Create Burger Order', () => {
  beforeEach(() => {
    cy.fixture('loginData').then((userData) => {
      cy.loginUser(userData.validUser.mail, userData.validUser.password);
    });
  });

  it('should create an order after building a burger', () => {
    cy.contains('.BuildControl_Label__TQkTk', 'Meat')
      .parent()
      .within(() => {
        cy.get('button').contains('More').click().click();
      });

    cy.get('button.BuildControls_OrderButton___M-Du')
      .should('not.be.disabled')
      .click();

    cy.contains('Your Order').should('be.visible');
    cy.contains('A delicious burger with the following ingredients:').should('be.visible');
    cy.contains('Total Price:').should('contain', '6.00');
    cy.get('button').contains('CONTINUE').should('be.visible');

    cy.contains('CONTINUE').click();
    cy.url().should('include', '/checkout');
    cy.contains('We hope it tastes well!', { timeout: 10000 }).should('be.visible');
    cy.contains('CONTINUE').click();

    cy.fixture('loginData').then((userData) => {
      const form = userData.formData;

      cy.getById("name").type(form.name);
      cy.getById("street").type(form.street);
      cy.getById("zipCode").type(form.zipCode);
      cy.getById("country").type(form.country);
      cy.getById("email").type(userData.validUser.mail);
      cy.getById('deliveryMethod').select('Fastest');
    });

    cy.contains('button', 'ORDER').click();

    cy.contains('Burger Builder').should('be.visible');

    cy.contains('a', 'Orders').click();

    cy.contains('Ingredients:').should('be.visible');
    cy.contains('meat (2)').should('be.visible');
    cy.contains('Price: USD 6.00').should('be.visible');
  });
});
