describe('Firebase Login API Test', () => {
  it('Should login successfully with correct email and password', () => {
    const apiKey = 'AIzaSyBQ1kZviUNMJNYG_PezyUSawxN1JcHOD28';
    const loginUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

    const credentials = {
      email: 'leenodeh287@gmail.com',
      password: 'leenodeh287@gmail.comL',
      returnSecureToken: true
    };

    cy.request({
      method: 'POST',
      url: loginUrl,
      body: credentials,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('idToken');
      expect(response.body).to.have.property('refreshToken');
      expect(response.body).to.have.property('localId');
      expect(response.body).to.have.property('email', credentials.email);
    });
  });
});
