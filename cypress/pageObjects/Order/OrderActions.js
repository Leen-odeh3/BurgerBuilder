class OrderActions {
  addMeatIngredient(times = 2) {
    cy.contains('.BuildControl_Label__TQkTk', 'Meat')
      .parent()
      .within(() => {
        for (let i = 0; i < times; i++) {
          cy.get('button').contains('More').click();
        }
      });
    return this;
  }

  goToOrdersPage() {
  cy.containsWithTag('a', 'Orders').click();
  return this;
}

  clickOrderButton() {
    cy.get('button.BuildControls_OrderButton___M-Du')
      .should('not.be.disabled')
      .click();
    return this;
  }

  clickContinue() {
    cy.containsWithTag('button', 'CONTINUE').click();
    return this;
  }

  fillCheckoutForm(form, email) {
    cy.getById("name").type(form.name);
    cy.getById("street").type(form.street);
    cy.getById("zipCode").type(form.zipCode);
    cy.getById("country").type(form.country);
    cy.getById("email").type(email);
    cy.getById('deliveryMethod').select('Fastest');
    return this;
  }

  clickOrder() {
    cy.containsWithTag('button', 'ORDER').click();
    return this;
  }

  goToOrdersPage() {
    cy.containsWithTag('a', 'Orders').click();
    return this;
  }
}

export const orderActions = new OrderActions();
