describe('Firebase Sign Up API Test', () => {
  it('should create a new user successfully', () => {
    cy.request({
      method: 'POST',
      url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBQ1kZviUNMJNYG_PezyUSawxN1JcHOD28',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email: `testuser_${Date.now()}@example.com`,
        password: '12345678',
        returnSecureToken: true,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('idToken');
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('refreshToken');
      expect(response.body).to.have.property('expiresIn');
      expect(response.body).to.have.property('localId');
    });
  });

  it('should return error if email already exists', () => {
  const email = 'leenodeh287@gmail.com'; 

  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBQ1kZviUNMJNYG_PezyUSawxN1JcHOD28',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      email: email,
      password: '12345678',
      returnSecureToken: true,
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body.error.message).to.eq('EMAIL_EXISTS');
  });
});

});
