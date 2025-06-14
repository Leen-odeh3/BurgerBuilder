class AuthAssertions {
  assertLoginSuccess() {
    cy.containsWithTag('a', 'Logout').should('be.visible');
    cy.containsWithTag('a', 'Orders').should('be.visible');
    cy.url().should('not.include', '/auth');
    return this;
  }

  assertOnHomePage() {
    cy.location('pathname').should('eq', '/');
    return this;
  }

  assertErrorMessage(message) {
    cy.contains(message).should('be.visible');
    return this;
  }
}

export const authAssertions = new AuthAssertions();
