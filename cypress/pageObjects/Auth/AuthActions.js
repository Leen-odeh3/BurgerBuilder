class AuthActions {
  visitAuthPage() {
    cy.getByHref('/auth').first().click();
    return this;
  }

  switchToSignin() {
    cy.containsWithTag('button', 'SWITCH TO SIGNIN').click();
    return this;
  }

  fillEmail(email) {
    cy.getById('email').clear();
    if (email) {
      cy.getById('email').type(email);
    }
    return this;
  }

  fillPassword(password) {
    cy.getById('password').clear();
    if (password) {
      cy.getById('password').type(password);
    }
    return this;
  }

  submit() {
    cy.containsWithTag('button', 'SUBMIT').click();
    return this;
  }

  logout() {
    cy.containsWithTag('a', 'Logout').click();
    return this;
  }
}

export const authActions = new AuthActions();
