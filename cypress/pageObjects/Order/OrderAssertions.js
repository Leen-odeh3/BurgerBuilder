class OrderAssertions {
  assertOrderSummaryVisible() {
    cy.containsWithTag('h3', 'Your Order').should('be.visible');
    cy.containsWithTag('p', 'A delicious burger with the following ingredients:').should('be.visible');
    cy.containsWithTag('p', 'Total Price:').should('contain', '6.00');
    cy.containsWithTag('button', 'CONTINUE').should('be.visible');
    return this;
  }

  assertCheckoutPage() {
    cy.url().should('include', '/checkout');
    cy.containsWithTag('h1', 'We hope it tastes well!', { timeout: 10000 }).should('be.visible');
    return this;
  }

  assertNoOrders() {
    cy.get('div').should('be.empty');
    return this;
  }

  assertOrderConfirmation() {
    cy.containsWithTag('a', 'Burger Builder').should('be.visible');
    return this;
  }

  assertOrderDetails() {
    cy.containsWithTag('p', 'Ingredients:').should('be.visible');
    cy.containsWithTag('p', 'meat (2)').should('be.visible');
    cy.containsWithTag('p', 'Price: USD 6.00').should('be.visible');
    return this;
  }
}

export const orderAssertions = new OrderAssertions();
